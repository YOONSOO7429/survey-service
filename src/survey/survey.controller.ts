import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/createSurvey.dto';
import { EditSurveyDto } from './dto/editSurvey.dto';
import { QuestionService } from 'src/question/question.service';
import { OptionService } from 'src/option/option.service';

@Controller('survey')
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService,
    private readonly questionService: QuestionService,
    private readonly optionService: OptionService,
  ) {}

  /* 설문지 생성 */
  @Post('createSurvey')
  async createSurvey(
    @Body() createSurveyDto: CreateSurveyDto,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 생성
      await this.surveyService.createSurvey(createSurveyDto);
      return res.status(HttpStatus.OK).json({ message: '설문지 생성 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('SurveyController/createSurvey');
    }
  }

  /* 설문지 수정 */
  @Put(':surveyId/editSurvey')
  async editSurvey(
    @Body() editSurveyDto: EditSurveyDto,
    @Param('surveyId') surveyId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 조회
      const survey = await this.surveyService.findOneSurvey(surveyId);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '설문지가 존재하지 않습니다.' });
      }

      // 설문지 수정
      const editSurvey = await this.surveyService.editSurvey(
        editSurveyDto,
        surveyId,
      );
      if (editSurvey.affected === 0) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: '내부 서버 에러' });
      }
      return res.status(HttpStatus.OK).json({ message: '설문지 수정 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('SurveyController/editSurvey');
    }
  }

  /* 설문지 삭제(softDelete) */
  @Delete(':surveyId/deleteSurvey')
  async deleteSurvey(
    @Param('surveyId') surveyId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 조회
      const survey = await this.surveyService.findOneSurvey(surveyId);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '설문지가 존재하지 않습니다.' });
      }

      // 설문지 삭제
      const deleteSurvey = await this.surveyService.deleteSurvey(surveyId);
      if (deleteSurvey.affected === 0) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: '내부 서버 에러' });
      }

      return res.status(HttpStatus.OK).json({ message: '설문지 삭제 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('SurveyController/deleteSurvey');
    }
  }

  /* 설문지 상세 조회 */
  @Get(':surveyId')
  async getSurveyDetail(
    @Param('surveyId') surveyId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 조회
      const survey = await this.surveyService.findOneSurvey(surveyId);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 설문지입니다.' });
      }

      // 문항 조회
      const question =
        await this.questionService.findAllQuestionWithOptions(surveyId);

      return res.status(HttpStatus.OK).json({ survey, question });
    } catch (e) {
      console.error(e);
      throw new Error('SurveyController/getSurveyDetail');
    }
  }

  /* 설문지 완료 */
  @Put(':surveyId/surveyIsDone')
  async surveyIsDone(
    @Param('surveyId') surveyId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 조회
      const survey = await this.surveyService.findOneSurvey(surveyId);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 설문지입니다.' });
      }
      await this.surveyService.surveyIsDone(surveyId);
      return res.status(HttpStatus.OK).json({ message: '설문지 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('SurveyController/surveyIsDone');
    }
  }

  /* 완료한 설문지 확인 */
  @Get('surveyIsDone')
  async getSurveyIsDone(@Res() res: any): Promise<any> {
    try {
      // 완료된 설문지 조회
      const surveyIsDone = await this.surveyService.findAllSurveyIsDone();
      return res.status(HttpStatus.OK).json(surveyIsDone);
    } catch (e) {
      console.error(e);
      throw new Error('SurveyController/getSurveyIsDone');
    }
  }
}
