import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from 'src/users/users.module';
import { ReportsModule } from 'src/reports/reports.module';
import { User } from 'src/users/user.entity';
import { Report } from 'src/reports/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
