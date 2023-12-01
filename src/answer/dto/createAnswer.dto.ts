import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { AnswerContent } from '../entities/answerContent.entity';

export class CreateAnswerDto {
  // survey_id
  @IsNumber()
  @IsNotEmpty()
  survey_id: number;

  @ValidateNested({ each: true })
  @Type(() => AnswerContent)
  @IsNotEmpty()
  answer_content: AnswerContent[];
}
