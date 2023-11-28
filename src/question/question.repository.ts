import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { EditQuestionDto } from './dto/editQuestion.dto';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  /* 문항 생성 */
  async createQuestion(
    createQuestionDto: CreateQuestionDto,
    surveyId: number,
  ): Promise<any> {
    try {
      const { questionNumber, questionContent } = createQuestionDto;
      const question = new Question();
      question.questionNumber = questionNumber;
      question.questionContent = questionContent;
      question.surveyId = surveyId;
      await this.questionRepository.save(question);
      return question;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionRepository/createQuestion');
    }
  }

  /* 문항 수정 */
  async editQuestion(
    editQuestionDto: EditQuestionDto,
    questionId: number,
  ): Promise<any> {
    try {
      const { questionNumber, questionContent } = editQuestionDto;
      const editQuestion = await this.questionRepository.update(
        { questionId },
        { questionNumber, questionContent },
      );
      return editQuestion;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionRepository/editQuestion');
    }
  }

  /* 문항 삭제(softDelete) */
  async deleteQuestion(questionId: number): Promise<any> {
    try {
      // 한국 시간
      const koreaTimezoneOffset = 9 * 60;
      const currentDate = new Date();
      const today = new Date(
        currentDate.getTime() + koreaTimezoneOffset * 60000,
      );
      const deleteQuestion = await this.questionRepository.update(
        { questionId },
        { questionDeletedAt: today },
      );
      return deleteQuestion;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionService/deleteQuestion');
    }
  }

  /* 문항 상세 조회 */
  async findOneQuestion(questionId: number): Promise<any> {
    try {
      const question = await this.questionRepository.findOne({
        where: { questionId },
      });
      return question;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionRepository/findOneQuestion');
    }
  }
}
