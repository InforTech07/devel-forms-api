import { IsString, IsOptional, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateSurveyDto {
  @IsString()
  @MaxLength(255)
  name: string;
  
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateSurveyDto extends PartialType(CreateSurveyDto){}