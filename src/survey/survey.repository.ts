import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyRepository {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
  ) {}
}
