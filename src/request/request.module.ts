import { Module } from '@nestjs/common';

import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [RequestController],
  providers: [DatabaseService, RequestService],
})
export class RequestModule {}
