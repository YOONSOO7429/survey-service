import { IsOptional, IsString } from 'class-validator';

export class EditOptionDto {
  // option_number
  @IsString()
  @IsOptional()
  option_number: number;

  // option_content
  @IsString()
  @IsOptional()
  option_content: string;
}
