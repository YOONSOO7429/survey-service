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
      const { questionNumber, questionContent, duplicateAnswer } =
        createQuestionDto;
      const question = new Question();
      question.questionNumber = questionNumber;
      question.questionContent = questionContent;
      question.duplicateAnswer = duplicateAnswer;
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
      const { questionNumber, questionContent, duplicateAnswer } =
        editQuestionDto;
      if (duplicateAnswer) {
        const editQuestion = await this.questionRepository.update(
          { questionId },
          { questionNumber, questionContent, duplicateAnswer },
        );
        return editQuestion;
      }
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
      const deleteQuestion = await this.questionRepository.delete({
        questionId,
      });
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

  /* 문항 수 체크를 위한 조회 */
  async findAllQuestion(surveyId: number): Promise<any> {
    try {
      const question = await this.questionRepository
        .createQueryBuilder('question')
        .select('questionId')
        .where('surveyId = :surveyId', { surveyId })
        .getRawMany();
      return question;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionRepository/findAllQuestion');
    }
  }

  /* 설문지에 맞는 문항 조회 */
  async findAllQuestionWithOptions(surveyId: number): Promise<any> {
    try {
      const question = await this.questionRepository
        .createQueryBuilder('question')
        .leftJoin('option', 'option', 'option.questionId = question.questionId')
        .select([
          'question.surveyId AS surveyId',
          'question.questionId AS questionId',
          'question.questionNumber AS questionNumber',
          'question.questionContent AS questionContent',
          'question.duplicateAnswer AS duplicateAnswer',
          `JSON_ARRAYAGG(
            JSON_OBJECT(
              'optionId', option.optionId, 
              'optionNumber', option.optionNumber, 
              'optionContent', option.optionContent,)
              )AS option`,
        ])
        .where('surveyId = :surveyId', { surveyId })
        .getRawMany();
      return question;
    } catch (e) {
      console.error(e);
      throw new Error('QuestionService/findAllQuestionWithOptions');
    }
  }
}
