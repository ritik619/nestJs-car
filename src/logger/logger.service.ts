import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Logger } from './logger.entity';

@Injectable()
export class LoggerService {
  constructor(@InjectRepository(Logger) private repo: Repository<Logger>) {}
  log(body: string) {
    const log = this.repo.create({ id: randomUUID(), log: body });
    this.repo.save(log);
  }
}
