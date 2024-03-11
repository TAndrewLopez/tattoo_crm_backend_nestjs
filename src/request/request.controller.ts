import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { $Enums } from '@prisma/client';

import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/createRequest.dto';
import { IRequest } from './interfaces/request.interface';
import { RequestStatusValidationPipe } from './pipes/requestStatusValidation.pipe';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get()
  getRequests(): Promise<IRequest[]> {
    return this.requestService.getRequests();
  }

  @Get(':id')
  getRequestById(@Param('id', ParseIntPipe) id: number) {
    return this.requestService.getRequestById(id);
  }

  @Post()
  createRequest(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.createRequest(createRequestDto);
  }

  // @Patch(':id')
  // updateRequest(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() partialRequest: PartialRequest,
  // ) {
  //   return this.requestService.updateRequest(id, partialRequest);
  // }

  @Patch(':id/status')
  updateRequestStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', RequestStatusValidationPipe)
    status: $Enums.RequestStatusEnum,
  ) {
    return this.requestService.updateRequestStatus(id, status);
  }

  @Delete(':id')
  deleteRequest(@Param('id', ParseIntPipe) id: number) {
    return this.requestService.deleteRequest(id);
  }
}
