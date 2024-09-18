import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne, 
    OneToMany
} from "typeorm";
import { SurveyQuestion } from "./survey-question.entity";
import { SurveyResponse } from "src/survey-response/entities/survey-response.entity";

@Entity('option')
export class OptionQuestion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column()
    isCorrect: boolean;

    @ManyToOne(() => SurveyQuestion, surveyQuestion => surveyQuestion.options)
    surveyQuestion: SurveyQuestion;

    @OneToMany(() => SurveyResponse, surveyResponse => surveyResponse.selectedOption)
    responses: SurveyResponse[];

    @CreateDateColumn({ type: 'datetime' }) // Fecha de creación automática
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' }) // Fecha de actualización automática
    updatedAt: Date;

    @Column({ default: true }) // Campo activo por defecto
    isActive: boolean;
}