import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAnswerDto {
  // surveyId
  @IsNumber()
  @IsNotEmpty()
  surveyId: number;

  // answerContent
  @IsArray({ each: true })
  @IsNotEmpty()
  answerContent: { questionNumber: number; optionNumber: number[] }[];
}
