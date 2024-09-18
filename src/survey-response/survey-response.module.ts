import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyResponse } from './entities/survey-response.entity';
import { SurveyModule } from 'src/survey/survey.module';
import { SurveyResponseController } from './controllers/survey-response.controller';
import { SurveyResponseService } from './services/survey-response.service';
import { SelectedOption } from './entities/selected-option';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SurveyResponse,
            SelectedOption
        ]),
        SurveyModule
    ],
    controllers: [
        SurveyResponseController
    ],
    providers: [
        SurveyResponseService
    ],
    exports: [
        SurveyResponseService
    ]
})
export class SurveyResponseModule {}
