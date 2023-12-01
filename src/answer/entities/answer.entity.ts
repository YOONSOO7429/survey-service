import { Survey } from 'src/survey/entities/survey.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('answer')
export class Answer {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  answer_id: number;

  @ManyToOne(() => Survey, (survey) => survey.answer)
  @JoinColumn({ name: 'survey_id' })
  survey_id: number;

  @Column({ type: 'json', array: true, nullable: true })
  answer_content: { question_number: number; option_number: number[] }[];

  @Column({ type: 'boolean', default: false })
  answer_is_done: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  answer_created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  answer_updated_at: Date;
}
