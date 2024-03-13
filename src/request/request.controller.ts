import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/createRequest.dto';
import { IRequest } from './interfaces/request.interface';
import { GetRequestFilterDto } from './dto/getRequestFilter.dto';
import { PartialRequest } from './dto/partialRequest.dto';
import { UpdateRequestValidationPipe } from './pipes/updateRequestValidation.pipe';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseGuards(AuthGuard())
  @Get()
  getRequests(
    @Query(ValidationPipe) getRequestFilterDto: GetRequestFilterDto,
  ): Promise<IRequest[]> {
    return this.requestService.getRequests(getRequestFilterDto);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  getRequestById(@Param('id', ParseIntPipe) id: number): Promise<IRequest> {
    return this.requestService.getRequestById(id);
  }

  @Post('/public')
  createRequest(
    @Body(ValidationPipe) createRequestDto: CreateRequestDto,
  ): Promise<IRequest> {
    const {
      fullName,
      email,
      phoneNumber,
      size,
      placement,
      colorScheme,
      description,
    } = createRequestDto;

    return this.requestService.createRequest({
      fullName,
      email,
      phoneNumber,
      size,
      placement,
      colorScheme,
      description,
    });
  }

  @UseGuards(AuthGuard())
  @Post()
  createRequestAdmin(
    @Body(ValidationPipe) createRequestDto: CreateRequestDto,
  ): Promise<IRequest> {
    return this.requestService.createRequest(createRequestDto);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  updateRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe, UpdateRequestValidationPipe)
    partialRequest: PartialRequest,
  ): Promise<IRequest> {
    return this.requestService.updateRequest(id, partialRequest);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  deleteRequest(@Param('id', ParseIntPipe) id: number): Promise<IRequest> {
    return this.requestService.deleteRequest(id);
  }
}
