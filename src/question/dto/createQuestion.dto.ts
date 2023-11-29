import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateQuestionDto {
  // questionNumber
  @IsNumber()
  @IsNotEmpty()
  questionNumber: number;

  // questionContent
  @IsString()
  @IsNotEmpty()
  questionContent: string;

  // duplicateAnswer
  @IsBoolean()
  @IsOptional()
  duplicateAnswer: boolean;
}
