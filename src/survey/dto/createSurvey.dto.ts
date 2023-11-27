import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSurveyDto {
  // surveyTitle
  @IsString()
  @IsNotEmpty()
  surveyTitle: string;

  // surveyContent
  @IsString()
  @IsNotEmpty()
  surveyContent: string;
}
