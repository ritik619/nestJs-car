import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logger } from './logger/logger.entity';
import { LoggerModule } from './logger/logger.module';
import { Report } from './report/entity/report.entity';
import { ReportModule } from './report/report.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report, Logger],
      synchronize: true,
    }),
    UserModule,
    ReportModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
