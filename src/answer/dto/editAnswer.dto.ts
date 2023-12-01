import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditAnswerDto {
  // survey_id
  @IsNumber()
  @IsOptional()
  survey_id: number;

  // answer_content
  @IsArray({ each: true })
  @IsOptional()
  answer_content: { question_number: number; option_number: number[] }[];
}
