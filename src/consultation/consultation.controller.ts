import { Body, Controller, Get, Post } from '@nestjs/common';

import { ConsultationService } from './consultation.service';
import { IConsultation } from './interfaces/consultation.interface';
import { CreateConsultationDto } from './dto/createConsultation.dto';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Get()
  getConsultations(): Promise<IConsultation[]> {
    return this.consultationService.getConsultations();
  }

  @Post()
  createConsultation(
    @Body() createConsultationDto: CreateConsultationDto,
  ): Promise<IConsultation> {
    return this.consultationService.createConsultation(createConsultationDto);
  }
}
