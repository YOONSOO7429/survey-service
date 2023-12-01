import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AnswerContent } from '../entities/answerContent.entity';

export class EditAnswerDto {
  // survey_id
  @IsNumber()
  @IsOptional()
  survey_id: number;

  // answer_content
  @ValidateNested({ each: true })
  @Type(() => AnswerContent)
  @IsOptional()
  answer_content: AnswerContent[];
}
