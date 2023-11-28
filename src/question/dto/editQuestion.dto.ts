import { IsOptional, IsString } from 'class-validator';

export class EditQuestionDto {
  // surveyTitle
  @IsString()
  @IsOptional()
  questionNumber: number;

  // surveyContent
  @IsString()
  @IsOptional()
  questionContent: string;
}
