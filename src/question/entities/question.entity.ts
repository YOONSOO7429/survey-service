import { Survey } from 'src/survey/entities/survey.entity';
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

@Entity('question')
export class Question {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  questionId: number;

  @ManyToOne(() => Survey, (survey) => survey.question)
  @JoinColumn({ name: 'surveyId' })
  surveyId: number;

  @Column({ type: 'int' })
  questionNumber: number;

  @Column({ type: 'varchar' })
  questionContent: string;

  @CreateDateColumn({ type: 'timestamp' })
  questionCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  questionUpdatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  questionDeletedAt: Date;
}
