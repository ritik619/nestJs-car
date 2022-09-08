import { LoggerService } from 'src/logger/logger.service';
import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  constructor(private loggerService: LoggerService) {}
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    const bodyString = JSON.stringify(this);
    console.log(this.loggerService);
    this.loggerService.log(bodyString);
  }
}
