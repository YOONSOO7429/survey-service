import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditQuestionDto {
  // question_number
  @IsNumber()
  @IsOptional()
  question_number: number;

  // question_content
  @IsString()
  @IsOptional()
  question_content: string;

  // duplicate_answer
  @IsBoolean()
  @IsOptional()
  duplicate_answer: boolean;
}
