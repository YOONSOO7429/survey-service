import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateQuestionDto {
  // question_number
  @IsNumber()
  @IsNotEmpty()
  question_number: number;

  // question_content
  @IsString()
  @IsNotEmpty()
  question_content: string;

  // duplicate_answer
  @IsBoolean()
  @IsOptional()
  duplicate_answer: boolean;
}
