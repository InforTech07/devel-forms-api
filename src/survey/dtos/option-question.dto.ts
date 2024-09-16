import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateOptionQuestionDto {
    @IsString()
    label: string;

    @IsBoolean()
    isCorrect: boolean;

    @IsOptional()
    @IsBoolean()
    disabledText: boolean;

    @IsOptional()
    @IsBoolean()
    disabledDate: boolean;

    @IsOptional()
    @IsBoolean()
    disabledNumber: boolean;

    @IsBoolean()
    isOnlyOption: boolean;

    @IsNumber()
    surveyQuestionId: number;
}

export class UpdateOptionQuestionDto extends PartialType(CreateOptionQuestionDto){}