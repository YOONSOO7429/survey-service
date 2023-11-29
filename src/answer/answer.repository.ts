import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/createAnswer.dto';
import { EditAnswerDto } from './dto/editAnswer.dto';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
  ) {}

  /* 답변 생성 */
  async createAnswer(createAnswerDto: CreateAnswerDto): Promise<any> {
    try {
      const { surveyId, questionId, answerNumber } = createAnswerDto;
      const answer = new Answer();
      answer.surveyId = surveyId;
      answer.questionId = questionId;
      answer.answerNumber = answerNumber;
      await this.answerRepository.save(answer);
      return answer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerRepository/createAnswer');
    }
  }

  /* 답변 수정 */
  async editAnswer(
    editAnswerDto: EditAnswerDto,
    answerId: number,
  ): Promise<any> {
    try {
      const { surveyId, questionId, answerNumber } = editAnswerDto;
      const editAnswer = await this.answerRepository.update(
        { answerId },
        { surveyId, questionId, answerNumber },
      );
      return editAnswer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerRepository/editAnswer');
    }
  }

  /* 답변 삭제 */
  async deleteAnswer(answerId: number): Promise<any> {
    try {
      const deleteAnswer = await this.answerRepository.delete({ answerId });
      return deleteAnswer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerRepository/deleteAnswer');
    }
  }

  /* 중복 답변을 위한 조회 */
  async findAnswerByDuplicate(questionId: number): Promise<any> {
    try {
      const answer = await this.answerRepository.find({
        where: { questionId },
      });
      return answer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerService/findAnswerByDuplicate');
    }
  }
}
