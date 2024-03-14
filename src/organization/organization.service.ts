import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateOrganizationDto } from './dto/createOrganization.dto';
import { DatabaseService } from 'src/database/database.service';
import { IOrganization } from './interfaces/organization.interface';
import { UpdateOrganizationDto } from './dto/updateOrganization.dto';
import { UpdateOrgsAndUsersDto } from './dto/updateOrgsAndUsers.dto';

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

  async getOrganizationById(id: number): Promise<IOrganization> {
    try {
      const org = await this.prisma.organization.findUnique({
        where: { id },
        include: {
          employees: {
            select: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
          requests: true,
        },
      });

      const employees = org.employees.map((employee) => ({
        id: employee.user.id,
        username: employee.user.username,
      }));

      return { ...org, employees };
    } catch (error) {
      throw new NotFoundException(`Organization with id: ${id} was not found.`);
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
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `User with id: ${createOrganizationDto.userId} has already been assigned an organization.`,
        );
      }
      if (error.code === 'P2003') {
        throw new NotFoundException(
          `User with id: ${createOrganizationDto.userId} was not found.`,
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

  async addUserToOrg(id: number, userId: number): Promise<void> {
    try {
      await this.prisma.orgsAndUsers.create({
        data: {
          organizationId: id,
          userId,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `User with id: ${userId} already exist in organization.`,
        );
      }

      if (error.code === 'P2003') {
        throw new NotFoundException(
          `User with id: ${userId} or Org with id: ${id} was not found.`,
        );
      }

      throw new InternalServerErrorException();
    }
  }

  async updateUserToOrg(
    id: number,
    updateOrgsAndUsersDto: UpdateOrgsAndUsersDto,
  ): Promise<void> {
    await this.prisma.orgsAndUsers.update({
      where: {
        userId_organizationId: {
          organizationId: id,
          userId: updateOrgsAndUsersDto.userId,
        },
      },
      data: {
        organizationId: updateOrgsAndUsersDto.organizationId,
      },
    });
    return;
  }

  async deleteOrganization(id: number): Promise<IOrganization> {
    try {
      return await this.prisma.organization.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Organization with id: ${id} was not found.`);
    }
  }
}
