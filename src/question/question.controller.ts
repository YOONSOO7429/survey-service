import {
  Body,
  Controller,
  Post,
  Res,
  Param,
  HttpStatus,
  Put,
  Delete,
  Get,
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
  @Post(':survey_id/createQuestion')
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Param('survey_id') survey_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 확인
      const survey = await this.surveyService.findOneSurvey(survey_id);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 설문지입니다.' });
      }

      // 설문지에 있는 문항 조회
      const questions = await this.questionService.findAllQuestion(survey_id);
      for (let i = 0; i < questions.length; i++) {
        if (
          questions[i].question_number === createQuestionDto.question_number
        ) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: '이미 문항의 번호가 존재합니다.' });
        }
      }

      // 문항 생성
      await this.questionService.createQuestion(createQuestionDto, survey_id);
      return res.status(HttpStatus.OK).json({ message: '문항 생성 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('QuestionController/createQuestion');
    }
  }

  /* 문항 수정 */
  @Put(':survey_id/:question_id/editQuestion')
  async editQuestion(
    @Body() editQuestionDto: EditQuestionDto,
    @Param('survey_id') survey_id: number,
    @Param('question_id') question_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 확인
      const survey = await this.surveyService.findOneSurvey(survey_id);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 설문지입니다.' });
      }

      // 문항 확인
      const question = await this.questionService.findOneQuestion(question_id);
      if (!question) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 설문지에 있는 문항 조회
      const questions = await this.questionService.findAllQuestion(survey_id);
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].question_number === editQuestionDto.question_number) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: '이미 문항의 번호가 존재합니다.' });
        }
      }

      // 문항 수정
      const editQuestion = await this.questionService.editQuestion(
        editQuestionDto,
        question_id,
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

  /* 문항 삭제 */
  @Delete(':survey_id/:question_id/deleteQuestion')
  async deleteQuestion(
    @Param('survey_id') survey_id: number,
    @Param('question_id') question_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 확인
      const survey = await this.surveyService.findOneSurvey(survey_id);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 설문지입니다.' });
      }

      // 문항 확인
      const question = await this.questionService.findOneQuestion(question_id);
      if (!question) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 문항 삭제
      const deleteQuestion =
        await this.questionService.deleteQuestion(question_id);
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

  /* 문항 전체 조회 */
  @Get(':survey_id')
  async getAllQuestion(
    @Param('survey_id') survey_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 문항 확인
      const question = await this.questionService.findAllQuestion(survey_id);
      return res.status(HttpStatus.OK).json(question);
    } catch (e) {
      console.error(e);
      throw new Error('QuestionController/getAllQuestion');
    }
  }
}
