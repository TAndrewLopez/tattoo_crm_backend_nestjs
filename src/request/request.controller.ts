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
@UseGuards(AuthGuard())
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get()
  getRequests(
    @Query(ValidationPipe) getRequestFilterDto: GetRequestFilterDto,
  ): Promise<IRequest[]> {
    return this.requestService.getRequests(getRequestFilterDto);
  }

  @Get(':id')
  getRequestById(@Param('id', ParseIntPipe) id: number): Promise<IRequest> {
    return this.requestService.getRequestById(id);
  }

  @Post()
  createRequest(@Body() createRequestDto: CreateRequestDto): Promise<IRequest> {
    return this.requestService.createRequest(createRequestDto);
  }

  @Patch(':id')
  updateRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateRequestValidationPipe) partialRequest: PartialRequest,
  ): Promise<IRequest> {
    return this.requestService.updateRequest(id, partialRequest);
  }

  @Delete(':id')
  deleteRequest(@Param('id', ParseIntPipe) id: number): Promise<IRequest> {
    return this.requestService.deleteRequest(id);
  }
}
