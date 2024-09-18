import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateSurveyResponseDto {
  @IsInt()
  surveyQuestionId: number;

  @IsOptional()
  @IsInt()
  selectedOptionId?: number; // Opción seleccionada (si es de opción múltiple)

  @IsOptional()
  @IsString()
  textAnswer?: string; // Respuesta de texto

  @IsOptional()
  @IsString()
  @IsDateString()
  dateAnswer?: string; // Respuesta de fecha

  @IsOptional()
  @IsNumber()
  numberAnswer?: number; // Respuesta numérica
}


export class UpdateSurveyResponseDto extends PartialType(CreateSurveyResponseDto){}

export class CreateSurveyResponsesDto {
    responses: CreateSurveyResponseDto[];
}