import { Controller, Body, Post, Param, Put, Get, Delete, ParseIntPipe, NotFoundException
} from '@nestjs/common';
import { SurveyService } from '../service/survey.service';
import { CreateSurveyDto } from '../dtos/survey.dto';
import { Survey } from '../entities/survey.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('surveys')
@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  // // Crear una nueva encuesta
  @Post()
  async createSurvey(
    @Body() createSurveyDto: CreateSurveyDto,
    @Body('userId') userId: number,
  ): Promise<Survey> {
    return this.surveyService.createSurvey(createSurveyDto, userId);
  }

  // // Actualizar una encuesta existente
  @Put(':id')
  async updateSurvey(
    @Param('id') id: number,
    @Body() updateSurveyDto: Partial<CreateSurveyDto>,
    @Body('userId') userId: number,
  ): Promise<Survey> {
    return this.surveyService.updateSurvey(id, updateSurveyDto, userId);
  }

  // // Obtener todas las encuestas
  @Get()
  async getAllSurveys(): Promise<Survey[]> {
    return this.surveyService.getAllSurveys();
  }

  // // Obtener una encuesta por ID
  @Get(':id')
  async getSurveyById(@Param('id') id: number): Promise<Survey> {
    const res = await this.surveyService.getSurveyById(id);
    if (!res) {
      throw new NotFoundException('Survey not found');
    }
    return res;
  }

  // Eliminar encuesta
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.surveyService.deleteSurvey(id);
  }

}
