import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';
import { AnswerModule } from './answer/answer.module';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    // config 설정
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // winston을 이용해 log 관리
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          level: 'info', // error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            utilities.format.nestLike('Survey-service', { prettyPrint: true }),
          ),
          filename: process.env.WINSTON_LOG_FILENAME,
        }),
      ],
    }),
    // db 설정
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
      synchronize: false,
    }),
    SurveyModule,
    QuestionModule,
    OptionModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
