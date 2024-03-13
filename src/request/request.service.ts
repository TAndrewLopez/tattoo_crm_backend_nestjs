import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { $Enums, Prisma } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';
import { CreateRequestDto } from './dto/createRequest.dto';
import { IRequest } from './interfaces/request.interface';
import { GetRequestFilterDto } from './dto/getRequestFilter.dto';
import { PartialRequest } from './dto/partialRequest.dto';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: DatabaseService) {}

  async getRequests(
    getRequestFilterDto: GetRequestFilterDto,
  ): Promise<IRequest[]> {
    const { colorScheme, search, status } = getRequestFilterDto;
    const where: Prisma.RequestWhereInput = {};

    if (status) where.status = status;
    if (colorScheme) where.colorScheme = colorScheme;

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    try {
      return await this.prisma.request.findMany({ where });
    } catch (error) {
      throw new InternalServerErrorException();
    }
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
        phoneNumber,
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

  async updateRequest(
    id: number,
    partialRequest: PartialRequest,
  ): Promise<IRequest> {
    try {
      return await this.prisma.request.update({
        where: { id },
        data: {
          ...partialRequest,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Request with id: ${id} was not found.`);
      }
      if (error.code === 'P2003') {
        throw new NotFoundException(
          `User with id: ${partialRequest.userId} was not found.`,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteRequest(id: number): Promise<IRequest> {
    try {
      return await this.prisma.request.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Request with id: ${id} was not found.`);
    }
  }
}
