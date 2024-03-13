import { Module } from '@nestjs/common';

import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [OrganizationController],
  providers: [DatabaseService, OrganizationService],
})
export class OrganizationModule {}
