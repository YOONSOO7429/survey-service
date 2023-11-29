import { Answer } from 'src/answer/entities/answer.entity';
import { Option } from 'src/option/entities/option.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column({ type: 'boolean', default: false })
  duplicateAnswer: Boolean;

  @CreateDateColumn({ type: 'timestamp' })
  questionCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  questionUpdatedAt: Date;

  @OneToMany(() => Option, (option) => option.questionId)
  option: Option[];

  @OneToMany(() => Answer, (answer) => answer.questionId)
  answer: Answer[];
}
