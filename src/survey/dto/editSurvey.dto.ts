import { IsOptional, IsString } from 'class-validator';

export class EditSurveyDto {
  // survey_title
  @IsString()
  @IsOptional()
  survey_title: string;

  // survey_content
  @IsString()
  @IsOptional()
  survey_content: string;
}
