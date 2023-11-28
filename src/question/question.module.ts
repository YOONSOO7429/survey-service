import { Module, forwardRef } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionRepository } from './question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { SurveyModule } from 'src/survey/survey.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    forwardRef(() => SurveyModule),
  ],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository],
  exports: [QuestionService, QuestionRepository],
})
export class QuestionModule {}
