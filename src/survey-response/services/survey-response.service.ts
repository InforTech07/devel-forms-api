import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyResponse } from '../entities/survey-response.entity';
import { SurveyQuestion } from 'src/survey/entities/survey-question.entity';
import { OptionQuestion } from 'src/survey/entities/option-question.entity';
import { CreateSurveyResponseDto } from '../dtos/survey-response.dto';



@Injectable()
export class SurveyResponseService {
  constructor(
    @InjectRepository(SurveyResponse)
    private surveyResponseRepository: Repository<SurveyResponse>,
    
    @InjectRepository(SurveyQuestion)
    private surveyQuestionRepository: Repository<SurveyQuestion>,
    
    @InjectRepository(OptionQuestion)
    private optionQuestionRepository: Repository<OptionQuestion>
  ) {}

  // Crear una nueva respuesta
  async createResponse(surveyQuestionId: number, createSurveyResponseDto: CreateSurveyResponseDto): Promise<SurveyResponse> {
    const surveyQuestion = await this.surveyQuestionRepository.findOne({
      where: { id: surveyQuestionId },
      relations: ['options'],
    });

    if (!surveyQuestion) {
      throw new Error('Survey Question not found');
    }

    const response = new SurveyResponse();
    response.surveyQuestion = surveyQuestion;

    // Validar tipo de respuesta y asignar el valor adecuado
    if (createSurveyResponseDto.selectedOptionId) {
        const selectedOption = await this.optionQuestionRepository.findOne({
            where: { id: createSurveyResponseDto.selectedOptionId },
          });
      if (!selectedOption) {
        throw new Error('Option not found');
      }
      response.selectedOption = selectedOption;
    }

    if (createSurveyResponseDto.textAnswer) {
      response.textAnswer = createSurveyResponseDto.textAnswer;
    }

    if (createSurveyResponseDto.dateAnswer) {
      response.dateAnswer = new Date(createSurveyResponseDto.dateAnswer);
    }

    if (createSurveyResponseDto.numberAnswer) {
      response.numberAnswer = createSurveyResponseDto.numberAnswer;
    }

    return await this.surveyResponseRepository.save(response);
  }

  // Obtener todas las respuestas de una pregunta
  async getResponsesForQuestion(surveyQuestionId: number): Promise<SurveyResponse[]> {
    return await this.surveyResponseRepository.find({
      where: { surveyQuestion: { id: surveyQuestionId } },
      relations: ['surveyQuestion', 'selectedOption'],
    });
  }


  async createSurveyResponses(createSurveyResponsesDto: CreateSurveyResponseDto[]): Promise<SurveyResponse[]> {
    const responses = [];

    for (const dto of createSurveyResponsesDto) {
      const surveyQuestion = await this.surveyQuestionRepository.findOne({
        where: { id: dto.surveyQuestionId }
      });
      if (!surveyQuestion) {
        throw new Error(`Survey question with ID ${dto.surveyQuestionId} not found`);
      }

      let selectedOption = null;
      if (dto.selectedOptionId !== undefined && dto.selectedOptionId !== null) {
        selectedOption = await this.optionQuestionRepository.findOne({
            where: { id: dto.selectedOptionId }
        });
        if (!selectedOption) {
          throw new Error(`Option with ID ${dto.selectedOptionId} not found`);
        }
      }

      const response = this.surveyResponseRepository.create({
        surveyQuestion,
        selectedOption,
        textAnswer: dto.textAnswer,
        dateAnswer: dto.dateAnswer ? new Date(dto.dateAnswer) : null,
        numberAnswer: dto.numberAnswer,
        createdAt: new Date(), // o usa la fecha actual si corresponde
        isActive: true,
      });

      responses.push(response);
    }

    return await this.surveyResponseRepository.save(responses);
  }

  async getPaginatedResponses(surveyQuestionId:number, page: number, limit: number): Promise<SurveyResponse[]> {
    return await this.surveyResponseRepository.find({
      where: { surveyQuestion: { id: surveyQuestionId } },
      relations: ['selectedOption'],
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}

