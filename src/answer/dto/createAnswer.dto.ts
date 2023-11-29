import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  // surveyId
  @IsNumber()
  @IsNotEmpty()
  surveyId: number;

  // questionId
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  // answerNumber
  @IsString()
  @IsNotEmpty()
  answerNumber: string;
}
