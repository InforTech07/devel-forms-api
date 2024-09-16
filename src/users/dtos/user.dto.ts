import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
//import { SurveySummaryDto } from './survey-summary.dto';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;

  // createdSurveys: SurveySummaryDto[];
  // updatedSurveys: SurveySummaryDto[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}