import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditAnswerDto {
  // surveyId
  @IsNumber()
  @IsOptional()
  surveyId: number;

  // answerContent
  @IsArray({ each: true })
  @IsOptional()
  answerContent: { questionNumber: number; optionNumber: number[] }[];
}
