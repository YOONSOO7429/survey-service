import { Injectable } from '@nestjs/common';
import { SurveyRepository } from './survey.repository';

@Injectable()
export class SurveyService {
  constructor(private readonly surveyRepository: SurveyRepository) {}
}
