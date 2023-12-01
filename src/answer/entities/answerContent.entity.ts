import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnswerContent {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  answer_content_id: number;

  @Column({ type: 'bigint' })
  question_number: number;

  @Column({ type: 'varchar' })
  option_number: string;
}
