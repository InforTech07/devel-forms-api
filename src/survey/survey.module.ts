import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { SurveyService } from './service/survey.service';
import { SurveyController } from './controller/survey.controller';
import { UsersModule } from 'src/users/users.module';
import { SurveyQuestion } from './entities/survey-question.entity';
import { SurveyQuestionService } from './service/survey-question.service';
import { SurveyQuestionController } from './controller/survey-question.controller';
import { OptionQuestion } from './entities/option-question.entity';
import { OptionQuestionService } from './service/option.service';
import { OptionQuestionController } from './controller/option-question.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Survey, SurveyQuestion, OptionQuestion]), UsersModule],
    providers: [SurveyService, SurveyQuestionService, OptionQuestionService],
    controllers: [SurveyController, SurveyQuestionController, OptionQuestionController],
    exports: [SurveyService, SurveyQuestionService, OptionQuestionService, TypeOrmModule],
})
export class SurveyModule {}
