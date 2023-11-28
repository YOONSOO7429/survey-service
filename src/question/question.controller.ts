import {
  Body,
  Controller,
  Post,
  Res,
  Param,
  HttpStatus,
  Put,
  Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { SurveyService } from 'src/survey/survey.service';
import { EditQuestionDto } from './dto/editQuestion.dto';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly surveyService: SurveyService,
  ) {}

  /* 문항 생성 */
  @Post(':surveyId/createQuestion')
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Param('surveyId') surveyId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 확인
      const survey = await this.surveyService.findOneSurvey(surveyId);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 설문지입니다.' });
      }

      // 문항 생성
      await this.questionService.createQuestion(createQuestionDto, surveyId);
      return res.status(HttpStatus.OK).json({ message: '문항 생성 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('QuestionController/createQuestion');
    }
  }

  /* 문항 수정 */
  @Put(':surveyId/:questionId/editQuestion')
  async editQuestion(
    @Body() editQuestionDto: EditQuestionDto,
    @Param('surveyId') surveyId: number,
    @Param('questionId') questionId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 확인
      const survey = await this.surveyService.findOneSurvey(surveyId);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 설문지입니다.' });
      }

      // 문항 확인
      const question = await this.questionService.findOneQuestion(questionId);
      if (!question) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 문항 수정
      const editQuestion = await this.questionService.createQuestion(
        editQuestionDto,
        questionId,
      );
      if (editQuestion.affected === 0) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: '내부 서버 에러' });
      }
      return res.status(HttpStatus.OK).json({ message: '문항 수정 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('QuestionController/editQuestion');
    }
  }

  /* 문항 삭제(softDelete) */
  @Delete(':surveyId/:questionId/editQuestion')
  async deleteQuestion(
    @Param('surveyId') surveyId: number,
    @Param('questionId') questionId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 확인
      const survey = await this.surveyService.findOneSurvey(surveyId);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 설문지입니다.' });
      }

      // 문항 확인
      const question = await this.questionService.findOneQuestion(questionId);
      if (!question) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 문항 삭제
      const deleteQuestion =
        await this.questionService.deleteQuestion(questionId);
      if (deleteQuestion.affected === 0) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: '내부 서버 에러' });
      }
      return res.status(HttpStatus.OK).json({ message: '문항 삭제 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('QuestionController/deleteQuestion');
    }
  }
}
