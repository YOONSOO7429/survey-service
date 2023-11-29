import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditAnswerDto {
  // surveyId
  @IsNumber()
  @IsOptional()
  surveyId: number;

  // questionId
  @IsNumber()
  @IsOptional()
  questionId: number;

  // answerNumber
  @IsString()
  @IsOptional()
  answerNumber: string;
}
