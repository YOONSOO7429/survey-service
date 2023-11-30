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
      const { surveyId, answerContent } = createAnswerDto;
      const answer = new Answer();
      answer.surveyId = surveyId;
      answer.answerContent = answerContent;
      answer.answerDone = true;
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
      const { answerContent } = editAnswerDto;
      const editAnswer = await this.answerRepository.update(
        { answerId },
        { answerContent },
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

  /* 제출한 답변 조회 */
  async findOneAnswer(answerId: number): Promise<any> {
    try {
      const answer = await this.answerRepository.findOne({
        where: { answerId },
      });
      return answer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerService/findOneAnswer');
    }
  }

  /* 답변 전체 조회 */
  async findAllAnswer(surveyId: number): Promise<any> {
    try {
      const answer = await this.answerRepository
        .createQueryBuilder('answer')
        .select(['surveyId', 'answerId', 'answerContent', 'answerDone'])
        .where('surveyId = :surveyId', { surveyId })
        .getRawMany();
      return answer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerService/findAllAnswer');
    }
  }
}
