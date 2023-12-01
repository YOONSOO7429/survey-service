import { Module, forwardRef } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { AnswerRepository } from './answer.repository';
import { SurveyModule } from 'src/survey/survey.module';
import { QuestionModule } from 'src/question/question.module';
import { AnswerContent } from './entities/answerContent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer, AnswerContent]),
    forwardRef(() => SurveyModule),
    forwardRef(() => QuestionModule),
  ],
  controllers: [AnswerController],
  providers: [AnswerService, AnswerRepository],
  exports: [AnswerService, AnswerRepository],
})
export class AnswerModule {}
