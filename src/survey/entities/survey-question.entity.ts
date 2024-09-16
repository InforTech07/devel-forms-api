import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Survey } from './survey.entity';
import { OptionQuestion } from './option-question.entity';
import { SurveyResponse } from 'src/survey-response/entities/survey-response.entity';

@Entity('surveysQuestion') // Nombre de la tabla en la base de datos
export class SurveyQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;
  
  @Column()
  type: string;

  @Column()
  required: boolean;

  @ManyToOne(() => Survey, survey => survey.questions)
  survey: Survey;

  @OneToMany(() => OptionQuestion, option => option.surveyQuestion)
  options: OptionQuestion[];

  @OneToMany(() => SurveyResponse, surveyResponse => surveyResponse.surveyQuestion)
  responses: SurveyResponse[];

  @CreateDateColumn({ type: 'datetime' }) // Fecha de creación automática
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' }) // Fecha de actualización automática
  updatedAt: Date;

  @Column({ default: true }) // Campo activo por defecto
  isActive: boolean;
}