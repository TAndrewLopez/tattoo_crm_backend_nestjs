import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { $Enums } from '@prisma/client';

import { IConsultation } from './interfaces/consultation.interface';
import { DatabaseService } from 'src/database/database.service';
import { CreateConsultationDto } from './dto/createConsultation.dto';

@Injectable()
export class ConsultationService {
  constructor(private readonly prisma: DatabaseService) {}

  async getConsultations(): Promise<IConsultation[]> {
    return await this.prisma.consultation.findMany();
  }

  async createConsultation(
    createConsultationDto: CreateConsultationDto,
  ): Promise<IConsultation> {
    const { date, requestId } = createConsultationDto;
    try {
      return await this.prisma.consultation.create({
        data: {
          date: new Date(date).toISOString(),
          requestId,
          status: $Enums.ConsultationStatusEnum.OPEN,
        },
      });
    } catch (error) {
      console.log({ error, code: error.code });
      throw new InternalServerErrorException();
    }
  }
}
