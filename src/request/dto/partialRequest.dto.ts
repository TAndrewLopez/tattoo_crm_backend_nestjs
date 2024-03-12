import { PartialType } from '@nestjs/mapped-types';

import { CreateRequestDto } from './createRequest.dto';

export class PartialRequest extends PartialType(CreateRequestDto) {
  userId?: number;
}
