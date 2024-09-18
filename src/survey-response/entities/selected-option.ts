import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { SurveyResponse } from './survey-response.entity';
import { OptionQuestion } from '../../survey/entities/option-question.entity';

@Entity('selected_options')
export class SelectedOption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SurveyResponse, surveyResponse => surveyResponse.selectedOptions, { onDelete: 'CASCADE' })
  surveyResponse: SurveyResponse;

  @ManyToOne(() => OptionQuestion, { nullable: false })
  option: OptionQuestion;

  @Column({ default: false })
  selected: boolean; // Indica si la opción fue seleccionada
}
