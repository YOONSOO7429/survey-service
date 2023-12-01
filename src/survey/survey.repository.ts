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
      const { survey_content, survey_title } = createSurveyDto;
      const survey = new Survey();
      survey.survey_title = survey_title;
      survey.survey_content = survey_content;
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
    survey_id: number,
  ): Promise<any> {
    try {
      const { survey_title, survey_content } = editSurveyDto;
      const editSurvey = await this.surveyRepository.update(
        { survey_id },
        { survey_title, survey_content },
      );
      return editSurvey;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyRepository/editSurvey');
    }
  }

  /* 설문지 삭제 */
  async deleteSurvey(survey_id: number): Promise<any> {
    try {
      // 설문지 삭제
      const deleteSurvey = await this.surveyRepository.delete({ survey_id });
      return deleteSurvey;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyRepository/deleteSurvey');
    }
  }

  /* 설문지 상세 조회 */
  async findOneSurvey(survey_id: number): Promise<any> {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { survey_id, survey_is_done: false },
      });
      return survey;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyRepository/findOneSurvey');
    }
  }

  /* 설문지 완료 */
  async surveyIsDone(survey_id: number): Promise<any> {
    try {
      const surveyIsDone = await this.surveyRepository.update(
        { survey_id },
        { survey_is_done: true },
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
        where: { survey_is_done: true },
      });
      return surveyIsDone;
    } catch (e) {
      console.error(e);
      throw new Error('SurveyService/findAllSurveyIsDone');
    }
  }
}
