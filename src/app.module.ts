import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { RequestModule } from './request/request.module';
import { OrganizationModule } from './organization/organization.module';
import { ConsultationModule } from './consultation/consultation.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    RequestModule,
    OrganizationModule,
    ConsultationModule,
  ],
})
export class AppModule {}
