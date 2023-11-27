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
      const survey = new Survey();
      survey.surveyTitle = createSurveyDto.surveyTitle;
      survey.surveyContent = createSurveyDto.surveyContent;
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
      const survey = await this.surveyRepository.update(
        { surveyId },
        { surveyTitle, surveyContent },
      );
      return survey;
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
      const survey = await this.surveyRepository.update(
        { surveyId },
        { surveyUpdatedAt: today },
      );
      return survey;
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
}
