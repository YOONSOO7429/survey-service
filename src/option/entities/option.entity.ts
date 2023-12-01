import { Question } from 'src/question/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('option')
export class Option {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  option_id: number;

  @ManyToOne(() => Question, (question) => question.option)
  @JoinColumn({ name: 'question_id' })
  question_id: number;

  @Column({ type: 'bigint' })
  option_number: number;

  @Column({ type: 'varchar' })
  option_content: string;

  @CreateDateColumn({ type: 'timestamp' })
  option_created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  option_updated_at: Date;
}
