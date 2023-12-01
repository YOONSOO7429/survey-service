import { Injectable } from '@nestjs/common';
import { SurveyRepository } from './survey.repository';
import { CreateSurveyDto } from './dto/createSurvey.dto';
import { EditSurveyDto } from './dto/editSurvey.dto';

@Injectable()
export class SurveyService {
  constructor(private readonly surveyRepository: SurveyRepository) {}

  /* 설문지 생성 */
  async createSurvey(createSurveyDto: CreateSurveyDto): Promise<any> {
    try {
      const survey = await this.surveyRepository.createSurvey(createSurveyDto);
      return survey;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyService/createSurvey');
    }
  }

  /* 설문지 수정 */
  async editSurvey(
    editSurveyDto: EditSurveyDto,
    survey_id: number,
  ): Promise<any> {
    try {
      const editSurvey = await this.surveyRepository.editSurvey(
        editSurveyDto,
        survey_id,
      );
      return editSurvey;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyService/editSurvey');
    }
  }

  /* 설문지 삭제 */
  async deleteSurvey(survey_id: number): Promise<any> {
    try {
      const deleteSurvey = await this.surveyRepository.deleteSurvey(survey_id);
      return deleteSurvey;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyService/deleteSurvey');
    }
  }

  /* 설문지 상세 조회 */
  async findOneSurvey(survey_id: number): Promise<any> {
    try {
      const survey = await this.surveyRepository.findOneSurvey(survey_id);
      return survey;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyService/findOneSurvey');
    }
  }

  /* 설문지 완료 */
  async surveyIsDone(survey_id: number): Promise<any> {
    try {
      const surveyIsDone = await this.surveyRepository.surveyIsDone(survey_id);
      return surveyIsDone;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyService/surveyIsDone');
    }
  }

  /* 완료한 설문지 확인 */
  async findAllSurveyIsDone(): Promise<any> {
    try {
      const surveyIsDone = await this.surveyRepository.findAllSurveyIsDone();
      return surveyIsDone;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyService/findAllSurveyIsDone');
    }
  }
}
