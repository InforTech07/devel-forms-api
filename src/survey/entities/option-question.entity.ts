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
import { SelectedOption } from "src/survey-response/entities/selected-option";

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

    @OneToMany(() => SelectedOption, selectedOption => selectedOption.option)
    selectedOptions: SelectedOption[];

    @CreateDateColumn({ type: 'datetime' }) // Fecha de creación automática
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' }) // Fecha de actualización automática
    updatedAt: Date;

    @Column({ default: true }) // Campo activo por defecto
    isActive: boolean;
}