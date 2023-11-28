import { IsOptional, IsString } from 'class-validator';

export class EditQuestionDto {
  // optionNumber
  @IsString()
  @IsOptional()
  optionNumber: number;

  // optionContent
  @IsString()
  @IsOptional()
  optionContent: string;
}
