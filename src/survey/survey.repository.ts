import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from './dto/createSurvey.dto';
import { EditSurveyDto } from './dto/editSurvey.dto';

@Injectable()
export class SurveyRepository {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
  ) {}

  /* 설문지 생성 */
  async createSurvey(createSurveyDto: CreateSurveyDto): Promise<any> {
    try {
      const { surveyContent, surveyTitle } = createSurveyDto;
      const survey = new Survey();
      survey.surveyTitle = surveyTitle;
      survey.surveyContent = surveyContent;
      await this.surveyRepository.save(survey);
      return survey;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyRepository/createSurvey');
    }
  }

  /* 설문지 수정 */
  async editSurvey(
    editSurveyDto: EditSurveyDto,
    surveyId: number,
  ): Promise<any> {
    try {
      const { surveyTitle, surveyContent } = editSurveyDto;
      const editSurvey = await this.surveyRepository.update(
        { surveyId },
        { surveyTitle, surveyContent },
      );
      return editSurvey;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyRepository/editSurvey');
    }
  }

  /* 설문지 삭제(softDelete) */
  async deleteSurvey(surveyId: number): Promise<any> {
    try {
      // 한국 시간
      const koreaTimezoneOffset = 9 * 60;
      const currentDate = new Date();
      const today = new Date(
        currentDate.getTime() + koreaTimezoneOffset * 60000,
      );
      // 설문지 삭제
      const deleteSurvey = await this.surveyRepository.update(
        { surveyId },
        { surveyUpdatedAt: today },
      );
      return deleteSurvey;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyRepository/deleteSurvey');
    }
  }

  /* 설문지 상세 조회 */
  async findOneSurvey(surveyId: number): Promise<any> {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { surveyId },
      });
      return survey;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyRepository/findOneSurvey');
    }
  }

  /* 설문지 완료 */
  async surveyIsDone(surveyId: number): Promise<any> {
    try {
      const surveyIsDone = await this.surveyRepository.update(
        { surveyId },
        { surveyIsDone: true },
      );
      return surveyIsDone;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyService/surveyIsDone');
    }
  }

  /* 완료한 설문지 확인 */
  async findAllSurveyIsDone(): Promise<any> {
    try {
      const surveyIsDone = await this.surveyRepository.find({
        where: { surveyIsDone: true },
      });
      return surveyIsDone;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyService/findAllSurveyIsDone');
    }
  }
}
