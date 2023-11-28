import { IsOptional, IsString } from 'class-validator';

export class EditOptionDto {
  // optionNumber
  @IsString()
  @IsOptional()
  optionNumber: number;

  // optionContent
  @IsString()
  @IsOptional()
  optionContent: string;
}
