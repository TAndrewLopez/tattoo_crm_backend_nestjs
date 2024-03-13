import { Module } from '@nestjs/common';

import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [ConsultationController],
  providers: [ConsultationService, DatabaseService],
})
export class ConsultationModule {}
