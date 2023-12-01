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
  @Put(':survey_id/editSurvey')
  async editSurvey(
    @Body() editSurveyDto: EditSurveyDto,
    @Param('survey_id') survey_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 조회
      const survey = await this.surveyService.findOneSurvey(survey_id);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '설문지가 존재하지 않습니다.' });
      }

      // 설문지 수정
      const editSurvey = await this.surveyService.editSurvey(
        editSurveyDto,
        survey_id,
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

  /* 설문지 삭제 */
  @Delete(':survey_id/deleteSurvey')
  async deleteSurvey(
    @Param('survey_id') survey_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 조회
      const survey = await this.surveyService.findOneSurvey(survey_id);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '설문지가 존재하지 않습니다.' });
      }

      // 설문지 삭제
      const deleteSurvey = await this.surveyService.deleteSurvey(survey_id);
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
  @Get(':survey_id')
  async getSurveyDetail(
    @Param('survey_id') survey_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 조회
      const survey = await this.surveyService.findOneSurvey(survey_id);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 설문지입니다.' });
      }

      // 문항 조회
      const question =
        await this.questionService.findAllQuestionWithOptions(survey_id);

      return res.status(HttpStatus.OK).json({ survey, question });
    } catch (e) {
      console.error(e);
      throw new Error('SurveyController/getSurveyDetail');
    }
  }

  /* 설문지 완료 */
  @Put(':survey_id/surveyIsDone')
  async surveyIsDone(
    @Param('survey_id') survey_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 설문지 조회
      const survey = await this.surveyService.findOneSurvey(survey_id);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 설문지입니다.' });
      }
      await this.surveyService.surveyIsDone(survey_id);
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
      const survey_is_done = await this.surveyService.findAllSurveyIsDone();
      return res.status(HttpStatus.OK).json(survey_is_done);
    } catch (e) {
      console.error(e);
      throw new Error('SurveyController/getSurveyIsDone');
    }
  }
}
