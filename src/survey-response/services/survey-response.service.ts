import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyResponse } from '../entities/survey-response.entity';
import { SurveyQuestion } from 'src/survey/entities/survey-question.entity';
import { OptionQuestion } from 'src/survey/entities/option-question.entity';
import { CreateSurveyResponseDto } from '../dtos/survey-response.dto';
import { SelectedOption } from '../entities/selected-option';


@Injectable()
export class SurveyResponseService {
  constructor(
    @InjectRepository(SurveyResponse)
    private surveyResponseRepository: Repository<SurveyResponse>,
    
    @InjectRepository(SurveyQuestion)
    private surveyQuestionRepository: Repository<SurveyQuestion>,
    
    @InjectRepository(OptionQuestion)
    private optionQuestionRepository: Repository<OptionQuestion>,
    @InjectRepository(SelectedOption)
    private selectedOptionRepository: Repository<SelectedOption>,
  ) {}

  // Crear una nueva respuesta
  // async createResponse(surveyQuestionId: number, createSurveyResponseDto: CreateSurveyResponseDto): Promise<SurveyResponse> {
  //   const surveyQuestion = await this.surveyQuestionRepository.findOne({
  //     where: { id: surveyQuestionId },
  //     relations: ['options'],
  //   });

  //   if (!surveyQuestion) {
  //     throw new Error('Survey Question not found');
  //   }

  //   const response = new SurveyResponse();
  //   response.surveyQuestion = surveyQuestion;

  //   // Validar tipo de respuesta y asignar el valor adecuado
  //   if (createSurveyResponseDto.selectedOptionId) {
  //       const selectedOption = await this.optionQuestionRepository.findOne({
  //           where: { id: createSurveyResponseDto.selectedOptionId },
  //         });
  //     if (!selectedOption) {
  //       throw new Error('Option not found');
  //     }
  //     response.selectedOption = selectedOption;
  //   }

  //   if (createSurveyResponseDto.textAnswer) {
  //     response.textAnswer = createSurveyResponseDto.textAnswer;
  //   }

  //   if (createSurveyResponseDto.dateAnswer) {
  //     response.dateAnswer = new Date(createSurveyResponseDto.dateAnswer);
  //   }

  //   if (createSurveyResponseDto.numberAnswer) {
  //     response.numberAnswer = createSurveyResponseDto.numberAnswer;
  //   }

  //   return await this.surveyResponseRepository.save(response);
  // }

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
  
      // Crear una nueva respuesta de encuesta
      const surveyResponse = this.surveyResponseRepository.create({
        surveyQuestion,
        textAnswer: dto.textAnswer || null,
        dateAnswer: dto.dateAnswer ? new Date(dto.dateAnswer) : null,
        numberAnswer: dto.numberAnswer || null,
        createdAt: new Date(),
        isActive: true,
      });
  
      // Guardar la respuesta para que esté disponible antes de asociar las opciones seleccionadas
      const savedSurveyResponse = await this.surveyResponseRepository.save(surveyResponse);
  
      // Procesar las opciones seleccionadas si las hay
      if (dto.selectedOptions && dto.selectedOptions.length > 0) {
        const selectedOptionEntities = await Promise.all(
          dto.selectedOptions.map(async (option) => {
            const optionQuestion = await this.optionQuestionRepository.findOne({ where: { id: option.optionId } });
  
            if (!optionQuestion) {
              throw new Error(`Option with ID ${option.optionId} not found`);
            }
  
            const selectedOption = new SelectedOption();
            selectedOption.surveyResponse = savedSurveyResponse;
            selectedOption.option = optionQuestion;
            selectedOption.selected = option.selected;
  
            return selectedOption;
          }),
        );
  
        // Guardar las opciones seleccionadas en la base de datos
        await this.selectedOptionRepository.save(selectedOptionEntities);
      }
  
      responses.push(savedSurveyResponse);
    }
  
    return responses;
  }
  

  async getPaginatedResponses(surveyQuestionId:number, page: number, limit: number): Promise<SurveyResponse[]> {
    return await this.surveyResponseRepository.find({
      where: { surveyQuestion: { id: surveyQuestionId } },
      relations: [
        'surveyQuestion', 
        'selectedOptions', 
        'selectedOptions.option'
      ],
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}

