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
import { AnswerContent } from './answerContent.entity';

@Entity('answer')
export class Answer {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  answer_id: number;

  @ManyToOne(() => Survey, (survey) => survey.answer)
  @JoinColumn({ name: 'survey_id' })
  survey_id: number;

  @Column({ type: 'jsonb', nullable: true })
  answer_content: AnswerContent[];

  @Column({ type: 'boolean', default: false })
  answer_is_done: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  answer_created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  answer_updated_at: Date;
}
