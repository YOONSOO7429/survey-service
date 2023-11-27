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

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

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
      // 설문지 수정
      await this.surveyService.editSurvey(editSurveyDto, surveyId);
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
      // 설문지 삭제
      await this.surveyService.deleteSurvey(surveyId);
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
      return res.status(HttpStatus.OK).json({ survey });
    } catch (e) {
      console.error(e);
      throw new Error('SurveyController/getSurveyDetail');
    }
  }
}
