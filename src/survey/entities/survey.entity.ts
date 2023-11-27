import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @CreateDateColumn({ type: 'timestamp' })
  surveyCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  surveyUpdatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  suveyDeletedAt: Date;
}
