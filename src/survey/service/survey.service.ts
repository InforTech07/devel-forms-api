import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../entities/survey.entity';
import { UsersService } from '../../users/services/users.service';
import { CreateSurveyDto } from '../dtos/survey.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    private readonly userService: UsersService,
  ) {}

  // Crear encuesta
  async createSurvey(createSurveyDto: CreateSurveyDto, userId: number): Promise<Survey> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const token = this.generateToken();

    const newSurvey = this.surveyRepository.create({
      ...createSurveyDto,
      token,
      createdBy: user,
      updatedBy: user,
    });

    return this.surveyRepository.save(newSurvey);
  }

  // // Actualizar encuesta
  async updateSurvey(id: number, updateSurveyDto: Partial<CreateSurveyDto>, userId: number): Promise<Survey> {
    const survey = await this.surveyRepository.findOne({ where: { id } });
    if (!survey) {
      throw new Error('Survey not found');
    }

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(survey, updateSurveyDto);
    survey.updatedBy = user;

    return this.surveyRepository.save(survey);
  }

  // // Obtener todas las encuestas y sus preguntas
  async getAllSurveys(idUser: number): Promise<Survey[]> {
    return this.surveyRepository.find({ 
      where: { isActive: true, createdBy: {id: idUser } }, 
      relations: [
        'questions'
      ] 
      });
  }

  // // Obtener encuesta por ID
  async getSurveyById(id: number): Promise<Survey> {
    const res = await this.surveyRepository.findOne({ where: { id }, relations: ['questions', 'questions.options'] });

    if(!res || !res.isActive) {
      throw new Error('Survey not found');
    }
    return res;
  }

  // Eliminar encuesta
  async deleteSurvey(id: number): Promise<any> {
    const result = await this.surveyRepository.update(id, { isActive: false });
    if (!result.affected) {
      throw new NotFoundException('Survey not found');
    }
    return { message: 'Survey deleted successfully' };
  }

  private generateToken() {
    return uuidv4();
  }

  //get survey by token
  async getSurveyByToken(token: string): Promise<Survey> {
    const survey = await this.surveyRepository.findOne({ where: { token }, relations: ['questions', 'questions.options'] });
    if (!survey) {
      throw new NotFoundException('Survey not found');
    }
    return survey;
  }
}
