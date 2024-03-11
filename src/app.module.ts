import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RequestModule } from './request/request.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), DatabaseModule, RequestModule],
})
export class AppModule {}
