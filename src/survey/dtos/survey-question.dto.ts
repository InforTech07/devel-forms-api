import { IsString, MaxLength, IsEnum, IsBoolean, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export enum QuestionType {
    TEXT = 'text',
    MULTIPLE_CHOICE = 'multiple-choice',
    DATE = 'date',
    NUMBER = 'number',
    SINGLE_CHOICE = 'single-choice',
}


export class CreateSurveyQuestionDto {
    @IsString()
    @MaxLength(255)
    text: string;

    @IsEnum(QuestionType)
    type: string;

    @IsBoolean()
    required: boolean;

    @IsNotEmpty()
    surveyId: number;
}

export class UpdateSurveyQuestionDto extends PartialType(CreateSurveyQuestionDto){}