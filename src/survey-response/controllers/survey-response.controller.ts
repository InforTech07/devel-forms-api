import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { SurveyResponseService } from '../services/survey-response.service';
import { CreateSurveyResponseDto } from '../dtos/survey-response.dto';
import { SurveyResponse } from '../entities/survey-response.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('survey-responses')
@Controller('survey-responses')
export class SurveyResponseController {
  constructor(private readonly surveyResponseService: SurveyResponseService) {}

  // Crear una nueva respuesta para una pregunta
  @Post(':surveyQuestionId')
  async createResponse(
    @Param('surveyQuestionId') surveyQuestionId: number,
    @Body() createSurveyResponseDto: CreateSurveyResponseDto
  ): Promise<SurveyResponse> {
    return await this.surveyResponseService.createResponse(surveyQuestionId, createSurveyResponseDto);
  }

  // Obtener todas las respuestas para una pregunta específica
  @Get(':surveyQuestionId')
  async getResponses(@Param('surveyQuestionId') surveyQuestionId: number): Promise<SurveyResponse[]> {
    return await this.surveyResponseService.getResponsesForQuestion(surveyQuestionId);
  }
}
