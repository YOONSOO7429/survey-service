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
    survey_id: number,
  ): Promise<any> {
    try {
      const { question_number, question_content, duplicate_answer } =
        createQuestionDto;
      const question = new Question();
      question.question_number = question_number;
      question.question_content = question_content;
      question.duplicate_answer = duplicate_answer;
      question.survey_id = survey_id;
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
    question_id: number,
  ): Promise<any> {
    try {
      const { question_number, question_content, duplicate_answer } =
        editQuestionDto;
      if (duplicate_answer) {
        const editQuestion = await this.questionRepository.update(
          { question_id },
          { question_number, question_content, duplicate_answer },
        );
        return editQuestion;
      }
      const editQuestion = await this.questionRepository.update(
        { question_id },
        { question_number, question_content },
      );
      return editQuestion;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionRepository/editQuestion');
    }
  }

  /* 문항 삭제 */
  async deleteQuestion(question_id: number): Promise<any> {
    try {
      const deleteQuestion = await this.questionRepository.delete({
        question_id,
      });
      return deleteQuestion;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionService/deleteQuestion');
    }
  }

  /* 문항 상세 조회 */
  async findOneQuestion(question_id: number): Promise<any> {
    try {
      const question = await this.questionRepository.findOne({
        where: { question_id },
      });
      return question;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionRepository/findOneQuestion');
    }
  }

  /* 문항 전체 조회 */
  async findAllQuestion(survey_id: number): Promise<any> {
    try {
      const question = await this.questionRepository
        .createQueryBuilder('question')
        .select([
          'question_id',
          'question_number',
          'question_content',
          'duplicate_answer',
        ])
        .where('survey_id = :survey_id', { survey_id })
        .getRawMany();
      return question;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionRepository/findAllQuestion');
    }
  }

  /* 설문지에 맞는 문항 조회 */
  async findAllQuestionWithOptions(survey_id: number): Promise<any> {
    try {
      const question = await this.questionRepository
        .createQueryBuilder('question')
        .leftJoinAndSelect('question.option', 'option')
        .where('question.survey_id = :survey_id', { survey_id })
        .groupBy('question.survey_id, question.question_id')
        .select([
          'question.survey_id AS survey_id',
          'question.question_id AS question_id',
          'question.question_number AS question_number',
          'question.question_content AS question_content',
          'question.duplicate_answer AS duplicate_answer',
          'json_agg(json_build_object(' +
            "'option_id', option.option_id, " +
            "'option_number', option.option_number, " +
            "'option_content', option.option_content" +
            ')) AS option',
        ])
        .getRawMany();
      return question;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionService/findAllQuestionWithOptions');
    }
  }
}
