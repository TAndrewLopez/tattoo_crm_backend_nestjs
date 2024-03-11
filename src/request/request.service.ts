import { Injectable, NotFoundException } from '@nestjs/common';
import { $Enums } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';
import { CreateRequestDto } from './dto/createRequest.dto';
import { IRequest } from './interfaces/request.interface';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: DatabaseService) {}

  async getRequests(): Promise<IRequest[]> {
    return await this.prisma.request.findMany();
  }

  async getRequestById(id: number): Promise<IRequest> {
    const request = await this.prisma.request.findUnique({ where: { id } });

    if (!request) {
      throw new NotFoundException(`Request with id: ${id} was not found.`);
    }

    return request;
  }

  async createRequest(createRequestDto: CreateRequestDto): Promise<IRequest> {
    const {
      fullName,
      email,
      phoneNumber,
      pronouns,
      colorScheme,
      description,
      placement,
      size,
    } = createRequestDto;

    const request = await this.prisma.request.create({
      data: {
        fullName,
        email,
        phoneNumber: parseInt(phoneNumber),
        pronouns,
        colorScheme,
        description,
        placement,
        size,
        status: $Enums.RequestStatusEnum.UNREAD,
      },
    });
    return request;
  }

  //   async updateRequest(
  //     id: number,
  //     partialRequest: PartialRequest,
  //   ): Promise<IRequest> {
  //     return await this.prisma.request.update({
  //       where: { id },
  //       data: { ...partialRequest },
  //     });
  //   }

  async updateRequestStatus(id: number, status: $Enums.RequestStatusEnum) {
    return await this.prisma.request.update({
      where: { id },
      data: { status },
    });
  }

  async deleteRequest(id: number): Promise<IRequest> {
    try {
      return await this.prisma.request.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Request with id: ${id} was not found.`);
    }
  }
}
