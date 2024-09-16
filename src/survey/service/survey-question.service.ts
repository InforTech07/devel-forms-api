import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyQuestionDto } from '../dtos/survey-question.dto';
import { SurveyQuestion } from '../entities/survey-question.entity';
import { Survey } from '../entities/survey.entity';

@Injectable()
export class SurveyQuestionService {
    constructor(
        @InjectRepository(SurveyQuestion)
        private readonly surveyQuestionRepository: Repository<SurveyQuestion>,
        @InjectRepository(Survey)
        private readonly surveyRepository: Repository<Survey>,
    ) {}

    // Create survey question
    async createSurveyQuestion(createSurveyQuestionDto: CreateSurveyQuestionDto): Promise<SurveyQuestion> {
        const survey = await this.surveyRepository.findOne({ where: { id: createSurveyQuestionDto.surveyId } });
        if (!survey) {
            throw new NotFoundException('Survey not found');
        }

        const newSurveyQuestion = this.surveyQuestionRepository.create({
            ...createSurveyQuestionDto,
            survey,
        });
        return this.surveyQuestionRepository.save(newSurveyQuestion);
    }

    // Update survey question
    async updateSurveyQuestion(id: number, updateSurveyQuestionDto: Partial<CreateSurveyQuestionDto>): Promise<SurveyQuestion> {
        const surveyQuestion = await this.surveyQuestionRepository.findOne({ where: { id } });
        if (!surveyQuestion) {
        throw new Error('Survey question not found');
        }

        Object.assign(surveyQuestion, updateSurveyQuestionDto);

        return this.surveyQuestionRepository.save(surveyQuestion);
    }

    // Get all survey questions by survey ID
    // async getAllSurveyQuestions(surveyId: number): Promise<SurveyQuestion[]> {
    //     return this.surveyQuestionRepository.find({ where: { surveyId } });
    // }

    // delete survey question
    async deleteSurveyQuestion(id: number): Promise<void> {
        await this.surveyQuestionRepository.delete(id);
    }

    async getSurveyQuestionById(id: number): Promise<SurveyQuestion> {
        const res = await this.surveyQuestionRepository.findOne({ where: { id }, relations: ['options'] });
        if (!res) {
        throw new NotFoundException('Survey question not found');
        }
        return res;
    }

}
