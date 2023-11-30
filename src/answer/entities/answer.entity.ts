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

  @Column({ type: 'json', array: true, nullable: true })
  answerContent: { questionNumber: number; optionNumber: number[] }[];

  @Column({ type: 'boolean', default: false })
  answerDone: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  answerCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  answerUpdatedAt: Date;
}
