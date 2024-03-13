import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/createOrganization.dto';
import { IOrganization } from './interfaces/organization.interface';
import { UpdateOrganizationDto } from './dto/updateOrganization.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  getOrganizations(): Promise<IOrganization[]> {
    return this.organizationService.getOrganizations();
  }

  @Post()
  createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<IOrganization> {
    return this.organizationService.createOrganization(createOrganizationDto);
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
