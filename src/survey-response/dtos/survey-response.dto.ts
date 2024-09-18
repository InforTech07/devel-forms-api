import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, IsNumber } from 'class-validator';

export class CreateSurveyResponseDto {
  @IsNumber()
  surveyQuestionId: number;

  @IsOptional()
  @IsString()
  textAnswer?: string;

  @IsOptional()
  @IsString()
  dateAnswer?: string; // O formato de fecha que estés utilizando

  @IsOptional()
  @IsNumber()
  numberAnswer?: number;

  @IsOptional()
  @IsArray()
  selectedOptions: {
    optionId: number;
    selected: boolean;
  }[];
}


export class UpdateSurveyResponseDto extends PartialType(CreateSurveyResponseDto){}

export class CreateSurveyResponsesDto {
    responses: CreateSurveyResponseDto[];
}