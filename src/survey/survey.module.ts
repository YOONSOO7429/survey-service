import { Module, forwardRef } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { SurveyRepository } from './survey.repository';
import { QuestionModule } from 'src/question/question.module';
import { OptionModule } from 'src/option/option.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey]),
    forwardRef(() => QuestionModule),
    forwardRef(() => OptionModule),
  ],
  controllers: [SurveyController],
  providers: [SurveyService, SurveyRepository],
  exports: [SurveyService, SurveyRepository],
})
export class SurveyModule {}
