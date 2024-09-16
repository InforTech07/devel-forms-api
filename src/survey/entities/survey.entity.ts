import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { SurveyQuestion } from './survey-question.entity';

@Entity('surveys') // Nombre de la tabla en la base de datos
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  token: string;

  @OneToMany(() => SurveyQuestion, surveyQuestion => surveyQuestion.survey)
  questions: SurveyQuestion[];

  @ManyToOne(() => User, user => user.createdSurveys)
  createdBy: User;

  @ManyToOne(() => User, user => user.updatedSurveys)
  updatedBy: User;

  @CreateDateColumn({ type: 'datetime' }) // Fecha de creación automática
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' }) // Fecha de actualización automática
  updatedAt: Date;
  
  @Column({ default: true })
  isActive: boolean;
}