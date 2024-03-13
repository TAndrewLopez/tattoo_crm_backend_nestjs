import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateOrganizationDto } from './dto/createOrganization.dto';
import { DatabaseService } from 'src/database/database.service';
import { IOrganization } from './interfaces/organization.interface';
import { UpdateOrganizationDto } from './dto/updateOrganization.dto';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: DatabaseService) {}

  async getOrganizations(): Promise<IOrganization[]> {
    try {
      return this.prisma.organization.findMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createOrganization(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<IOrganization> {
    try {
      return await this.prisma.organization.create({
        data: { ...createOrganizationDto },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException(
          `User with id: ${createOrganizationDto.userId} doesn't exists`,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async updateOrganization(
    id: number,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<IOrganization> {
    const { name, userId } = updateOrganizationDto;

    try {
      const organization = await this.prisma.organization.update({
        where: { id },
        data: {
          name,
          userId,
        },
      });

      return organization;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Organization with id: ${id} was not found.`,
        );
      }
      if (error.code === 'P2003') {
        throw new NotFoundException(
          `User with id: ${updateOrganizationDto.userId} was not found.`,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteOrganization(id: number): Promise<IOrganization> {
    try {
      return await this.prisma.organization.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Organization with id: ${id} was not found.`);
    }
  }
}
