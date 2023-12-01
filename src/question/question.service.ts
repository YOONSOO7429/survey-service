import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { QuestionRepository } from './question.repository';
import { EditQuestionDto } from './dto/editQuestion.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  /* 문항 생성 */
  async createQuestion(
    createQuestionDto: CreateQuestionDto,
    survey_id: number,
  ): Promise<any> {
    try {
      const question = await this.questionRepository.createQuestion(
        createQuestionDto,
        survey_id,
      );
      return question;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionService/createQuestion');
    }
  }

  /* 문항 수정 */
  async editQuestion(
    editQuestionDto: EditQuestionDto,
    question_id: number,
  ): Promise<any> {
    try {
      const editQuestion = await this.questionRepository.editQuestion(
        editQuestionDto,
        question_id,
      );
      return editQuestion;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionService/editQuestion');
    }
  }

  /* 문항 삭제(softDelete) */
  async deleteQuestion(question_id: number): Promise<any> {
    try {
      const deleteQuestion =
        await this.questionRepository.deleteQuestion(question_id);
      return deleteQuestion;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionService/deleteQuestion');
    }
  }

  /* 문항 상세 조회 */
  async findOneQuestion(question_id: number): Promise<any> {
    try {
      const question =
        await this.questionRepository.findOneQuestion(question_id);
      return question;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionService/findOneQuestion');
    }
  }

  /* 문항 수 체크를 위한 조회 */
  async findAllQuestion(survey_id: number): Promise<any> {
    try {
      const question = await this.questionRepository.findAllQuestion(survey_id);
      return question;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionService/findAllQuestion');
    }
  }

  /* 설문지에 맞는 문항 조회 */
  async findAllQuestionWithOptions(survey_id: number): Promise<any> {
    try {
      const question =
        await this.questionRepository.findAllQuestionWithOptions(survey_id);
      return question;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionService/findAllQuestionWithOptions');
    }
  }
}
