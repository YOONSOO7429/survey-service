import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/createAnswer.dto';
import { AnswerRepository } from './answer.repository';
import { EditAnswerDto } from './dto/editAnswer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  /* 답변 생성 */
  async createAnswer(createAnswerDto: CreateAnswerDto): Promise<any> {
    try {
      const answer = await this.answerRepository.createAnswer(createAnswerDto);
      return answer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerService/createAnswer');
    }
  }

  /* 답변 수정 */
  async editAnswer(
    editAnswerDto: EditAnswerDto,
    answer_id: number,
  ): Promise<any> {
    try {
      const editAnswer = await this.answerRepository.editAnswer(
        editAnswerDto,
        answer_id,
      );
      return editAnswer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerService/editAnswer');
    }
  }

  /* 답변 삭제 */
  async deleteAnswer(answer_id: number): Promise<any> {
    try {
      const deleteAnswer = await this.answerRepository.deleteAnswer(answer_id);
      return deleteAnswer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerService/deleteAnswer');
    }
  }

  /* 제출한 답변 조회 */
  async findOneAnswer(answer_id: number): Promise<any> {
    try {
      const answer = await this.answerRepository.findOneAnswer(answer_id);
      return answer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerService/findOneAnswer');
    }
  }

  /* 답변 전체 조회 */
  async findAllAnswer(survey_id: number): Promise<any> {
    try {
      const answer = await this.answerRepository.findAllAnswer(survey_id);
      return answer;
    } catch (e) {
      console.error(e);
      throw new Error('AnswerService/findAllAnswer');
    }
  }
}
