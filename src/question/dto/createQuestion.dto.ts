import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  // questionNumber
  @IsNumber()
  @IsNotEmpty()
  questionNumber: number;

  // questionContent
  @IsString()
  @IsNotEmpty()
  questionContent: string;
}
