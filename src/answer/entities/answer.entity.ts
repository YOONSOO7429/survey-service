import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('answer')
export class Answer {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  answerId: number;
}
