import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOptionDto {
  // option_number
  @IsNumber()
  @IsNotEmpty()
  option_number: number;

  // option_content
  @IsString()
  @IsNotEmpty()
  option_content: string;
}
