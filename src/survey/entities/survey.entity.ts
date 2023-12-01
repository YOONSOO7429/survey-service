import { Answer } from 'src/answer/entities/answer.entity';
import { Question } from 'src/question/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('survey')
export class Survey {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  survey_id: number;

  @Column({ type: 'varchar' })
  survey_title: string;

  @Column({ type: 'text' })
  survey_content: string;

  @Column({ type: 'boolean', default: false })
  survey_is_done: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  survey_created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  survey_updated_at: Date;

  @OneToMany(() => Question, (question) => question.survey_id)
  question: Question[];

  @OneToMany(() => Answer, (answer) => answer.survey_id)
  answer: Answer[];
}
