import { Module } from '@nestjs/common';

import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { DatabaseService } from 'src/database/database.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [OrganizationController],
  providers: [DatabaseService, OrganizationService],
})
export class OrganizationModule {}
