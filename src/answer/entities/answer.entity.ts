import { Option } from 'src/option/entities/option.entity';
import { Question } from 'src/question/entities/question.entity';
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
  answerId: number;

  @ManyToOne(() => Survey, (survey) => survey.answer)
  @JoinColumn({ name: 'surveyId' })
  surveyId: number;

  @ManyToOne(() => Question, (question) => question.answer)
  @JoinColumn({ name: 'questionId' })
  questionId: number;

  @Column({ type: 'varchar' })
  answerNumber: string;

  @CreateDateColumn({ type: 'timestamp' })
  answerCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  answerUpdatedAt: Date;
}
