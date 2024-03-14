import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { $Enums } from '@prisma/client';

import { IConsultation } from './interfaces/consultation.interface';
import { DatabaseService } from 'src/database/database.service';
import { CreateConsultationDto } from './dto/createConsultation.dto';

@Injectable()
export class ConsultationService {
  constructor(private readonly prisma: DatabaseService) {}

  async getConsultations(): Promise<IConsultation[]> {
    try {
      return await this.prisma.consultation.findMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
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
      if (error.code === 'P2002') {
        throw new ConflictException(
          `Request with id: ${createConsultationDto.requestId} already has a consultation.`,
        );
      }
      if (error.code === 'P2003') {
        throw new NotFoundException(
          `Request with id: ${createConsultationDto.requestId} was not found.`,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async updateConsultation(id: number) {
    try {
      return await this.prisma.consultation.update({ where: { id }, data: {} });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
