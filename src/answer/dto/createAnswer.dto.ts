import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAnswerDto {
  // survey_id
  @IsNumber()
  @IsNotEmpty()
  survey_id: number;

  // answer_content
  @IsArray({ each: true })
  @IsNotEmpty()
  answer_content: { question_number: number; option_number: number[] }[];
}
