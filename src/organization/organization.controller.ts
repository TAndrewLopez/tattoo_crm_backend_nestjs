import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/createOrganization.dto';
import { IOrganization } from './interfaces/organization.interface';
import { UpdateOrganizationDto } from './dto/updateOrganization.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateOrgsAndUsersDto } from './dto/updateOrgsAndUsers.dto';

@Controller('organization')
@UseGuards(AuthGuard())
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  getOrganizations(): Promise<IOrganization[]> {
    return this.organizationService.getOrganizations();
  }

  @Get(':id')
  getOrganizationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IOrganization> {
    return this.organizationService.getOrganizationById(id);
  }

  @Post()
  createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<IOrganization> {
    return this.organizationService.createOrganization(createOrganizationDto);
  }

  @Post(':id/user')
  addUserToOrg(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId') userId: number,
  ): Promise<void> {
    return this.organizationService.addUserToOrg(id, userId);
  }

  @Patch(':id/user')
  updateUserToOrg(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrgsAndUserDto: UpdateOrgsAndUsersDto,
  ): Promise<void> {
    console.log({ organizationId: id, updateOrgsAndUserDto });
    return this.organizationService.updateUserToOrg(id, updateOrgsAndUserDto);
  }

  @Patch(':id')
  updateOrganization(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) partialOrganization: UpdateOrganizationDto,
  ): Promise<IOrganization> {
    return this.organizationService.updateOrganization(id, partialOrganization);
  }

  @Delete(':id')
  deleteOrganization(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IOrganization> {
    return this.organizationService.deleteOrganization(id);
  }
}
