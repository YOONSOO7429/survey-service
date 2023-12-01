import { Option } from 'src/option/entities/option.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import {
  Column,
  CreateDateColumn,
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
  question_id: number;

  @ManyToOne(() => Survey, (survey) => survey.question)
  @JoinColumn({ name: 'survey_id' })
  survey_id: number;

  @Column({ type: 'int' })
  question_number: number;

  @Column({ type: 'varchar' })
  question_content: string;

  @Column({ type: 'boolean', default: false })
  duplicate_answer: Boolean;

  @CreateDateColumn({ type: 'timestamp' })
  question_created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  question_updated_at: Date;

  @OneToMany(() => Option, (option) => option.question_id)
  option: Option[];
}
