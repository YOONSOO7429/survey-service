import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditOptionDto {
  // option_number
  @IsNumber()
  @IsOptional()
  option_number: number;

  // option_content
  @IsString()
  @IsOptional()
  option_content: string;
}
