import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSurveyDto {
  // survey_title
  @IsString()
  @IsNotEmpty()
  survey_title: string;

  // survey_content
  @IsString()
  @IsNotEmpty()
  survey_content: string;
}
