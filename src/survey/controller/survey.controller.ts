import { Controller, Body, Post, Param, Put, Get, Delete, ParseIntPipe, NotFoundException,
  Request,
  UseGuards
} from '@nestjs/common';
import { SurveyService } from '../service/survey.service';
import { CreateSurveyDto } from '../dtos/survey.dto';
import { Survey } from '../entities/survey.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decarator';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('surveys')
@Controller('surveys')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    // // Crear una nueva encuesta
    @Post()
    async createSurvey(
      @Body() createSurveyDto: CreateSurveyDto,
      @Request() req,
    ): Promise<Survey> {
      const userId = req.user.userId;
      return this.surveyService.createSurvey(createSurveyDto, userId);
    }

    // // Actualizar una encuesta existente
    @Put(':id')
    async updateSurvey(
      @Param('id') id: number,
      @Body() updateSurveyDto: Partial<CreateSurveyDto>,
      @Request() req,
    ): Promise<Survey> {
      const userId = req.user.userId;
      return this.surveyService.updateSurvey(id, updateSurveyDto, userId);
    }

    // // Obtener todas las encuestas
    @Get()
    async getAllSurveys(
      @Request() req,
    ): Promise<Survey[]> {
      return this.surveyService.getAllSurveys(req.user.userId);
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

    //get survey by token
    @Get('token/:token')
    @Public()
    async getSurveyByToken(@Param('token') token: string): Promise<Survey> {
      const res = await this.surveyService.getSurveyByToken(token);
      if (!res) {
        throw new NotFoundException('Survey not found');
      }
      return res;
    }

}
