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
      const { survey_id, answer_content } = createAnswerDto;
      const answer = new Answer();
      answer.survey_id = survey_id;
      answer.answer_content = answer_content;
      answer.answer_is_done = true;
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
    answer_id: number,
  ): Promise<any> {
    try {
      const { answer_content } = editAnswerDto;
      const editAnswer = await this.answerRepository.update(
        { answer_id },
        { answer_content },
      );
      return editAnswer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerRepository/editAnswer');
    }
  }

  /* 답변 삭제 */
  async deleteAnswer(answer_id: number): Promise<any> {
    try {
      const deleteAnswer = await this.answerRepository.delete({ answer_id });
      return deleteAnswer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerRepository/deleteAnswer');
    }
  }

  /* 제출한 답변 조회 */
  async findOneAnswer(answer_id: number): Promise<any> {
    try {
      const answer = await this.answerRepository.findOne({
        where: { answer_id },
      });
      return answer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerService/findOneAnswer');
    }
  }

  /* 답변 전체 조회 */
  async findAllAnswer(survey_id: number): Promise<any> {
    try {
      const answer = await this.answerRepository
        .createQueryBuilder('answer')
        .select(['survey_id', 'answer_id', 'answer_content', 'answer_is_done'])
        .where('survey_id = :survey_id', { survey_id })
        .getRawMany();
      return answer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerService/findAllAnswer');
    }
  }
}
