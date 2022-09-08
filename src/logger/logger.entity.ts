import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Logger {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  log: string;
}
