import { Answer } from 'src/answer/entities/answer.entity';
import { Question } from 'src/question/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('survey')
export class Survey {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  surveyId: number;

  @Column({ type: 'varchar' })
  surveyTitle: string;

  @Column({ type: 'text' })
  surveyContent: string;

  @Column({ type: 'boolean', default: false })
  surveyIsDone: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  surveyCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  surveyUpdatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  suveyDeletedAt: Date;

  @OneToMany(() => Question, (question) => question.surveyId)
  question: Question[];

  @OneToMany(() => Answer, (answer) => answer.surveyId)
  answer: Answer[];
}
