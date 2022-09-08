import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from './logger.entity';
import { LoggerService } from './logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Logger])],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
