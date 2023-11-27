import { IsOptional, IsString } from 'class-validator';

export class EditSurveyDto {
  // surveyTitle
  @IsString()
  @IsOptional()
  surveyTitle: string;

  // surveyContent
  @IsString()
  @IsOptional()
  surveyContent: string;
}
