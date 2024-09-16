import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import { SurveyModule } from './survey/survey.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { Survey } from './survey/entities/survey.entity';
import { SurveyQuestion } from './survey/entities/survey-question.entity';
import { OptionQuestion } from './survey/entities/option-question.entity';
import { SurveyResponseModule } from './survey-response/survey-response.module';
import { SurveyResponse } from './survey-response/entities/survey-response.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa', // Cambia estos valores según tu configuración
      password: 'yourStrong#Password',
      database: 'develformsdb',
      entities: [User, Survey, SurveyQuestion, OptionQuestion, SurveyResponse], // Entidades globales
      synchronize: true, // ¡No uses esto en producción!
      options: {
        encrypt: false,
      },
    }),
    UsersModule,
    AuthModule,
    SurveyModule,
    SurveyResponseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
