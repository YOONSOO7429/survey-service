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
  optionId: number;

  @ManyToOne(() => Question, (question) => question.option)
  @JoinColumn({ name: 'questionId' })
  questionId: number;

  @Column({ type: 'int' })
  optionNumber: number;

  @Column({ type: 'varchar' })
  optionContent: string;

  @CreateDateColumn({ type: 'timestamp' })
  optionCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  optionUpdatedAt: Date;
}
