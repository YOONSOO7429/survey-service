import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOptionDto {
  // optionNumber
  @IsNumber()
  @IsNotEmpty()
  optionNumber: number;

  // optionContent
  @IsString()
  @IsNotEmpty()
  optionContent: string;
}
