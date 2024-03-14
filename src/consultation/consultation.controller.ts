import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { ConsultationService } from './consultation.service';
import { IConsultation } from './interfaces/consultation.interface';
import { CreateConsultationDto } from './dto/createConsultation.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('consultation')
@UseGuards(AuthGuard())
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Get()
  getConsultations(): Promise<IConsultation[]> {
    return this.consultationService.getConsultations();
  }

  @Post()
  createConsultation(
    @Body(ValidationPipe) createConsultationDto: CreateConsultationDto,
  ): Promise<IConsultation> {
    return this.consultationService.createConsultation(createConsultationDto);
  }

  @Patch('id')
  updateConsultation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IConsultation> {
    return this.consultationService.updateConsultation(id);
  }
}
