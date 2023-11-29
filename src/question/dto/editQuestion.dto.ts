import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class EditQuestionDto {
  // questionNumber
  @IsString()
  @IsOptional()
  questionNumber: number;

  // questionContent
  @IsString()
  @IsOptional()
  questionContent: string;

  // duplicateAnswer
  @IsBoolean()
  @IsOptional()
  duplicateAnswer: boolean;
}
