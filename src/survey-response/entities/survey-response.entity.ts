import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { SurveyQuestion } from '../../survey/entities/survey-question.entity';
import { OptionQuestion } from '../../survey/entities/option-question.entity';

@Entity('survey_responses') // Nombre de la tabla en la base de datos
export class SurveyResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SurveyQuestion, surveyQuestion => surveyQuestion.responses)
  surveyQuestion: SurveyQuestion;

  @ManyToOne(() => OptionQuestion, { nullable: true })
  selectedOption: OptionQuestion; // Respuesta seleccionada si es opción múltiple
  
  @Column({ nullable: true })
  textAnswer: string; // Respuesta de texto si es tipo "texto"

  @Column({ nullable: true, type: 'datetime' })
  dateAnswer: Date; // Respuesta de fecha si es tipo "fecha"

  @Column({ nullable: true })
  numberAnswer: number; // Respuesta numérica si es tipo "número"

  @CreateDateColumn({ type: 'datetime' }) // Fecha de creación automática
  createdAt: Date;

  @Column({ default: true }) // Campo activo por defecto
  isActive: boolean;
}
