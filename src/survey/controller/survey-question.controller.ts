import { Controller, Body, Post, Param, Put,  Delete, ParseIntPipe, Get
} from '@nestjs/common';
import { SurveyQuestionService } from '../service/survey-question.service';
import { CreateSurveyQuestionDto} from '../dtos/survey-question.dto';
import { SurveyQuestion } from '../entities/survey-question.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('surveys-questions')
@Controller('surveys')
export class SurveyQuestionController {
    constructor(private readonly surveyQuestionService: SurveyQuestionService) {}

    // Create survey question
    @Post('/add-question')
    async createSurveyQuestion(
        @Body() createSurveyQuestionDto: CreateSurveyQuestionDto,
    ): Promise<SurveyQuestion> {
        return this.surveyQuestionService.createSurveyQuestion(createSurveyQuestionDto);
    }

    // Update survey question
    @Put(':id/update-question')
    async updateSurveyQuestion(
        @Param('id') id: number,
        @Body() updateSurveyQuestionDto: Partial<CreateSurveyQuestionDto>,
    ): Promise<SurveyQuestion> {
        return this.surveyQuestionService.updateSurveyQuestion(id, updateSurveyQuestionDto);
    }

    // Get all survey questions by survey ID
    // @Get(':id/questions')
    // async getAllSurveyQuestions(@Param('id') surveyId: number): Promise<SurveyQuestion[]> {
    //     return this.surveyQuestionService.getAllSurveyQuestions(surveyId);
    // }

    // delete survey question
    @Delete(':id/delete-question')
    async deleteSurveyQuestion(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.surveyQuestionService.deleteSurveyQuestion(id);
    }

    // Get survey question by ID
    @Get('questions/:questionId')
    async getSurveyQuestionById(@Param('questionId') id: number): Promise<SurveyQuestion> {
        return this.surveyQuestionService.getSurveyQuestionById(id);
    }
    
}