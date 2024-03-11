import { BadRequestException, PipeTransform } from '@nestjs/common';
import { $Enums } from '@prisma/client';

export class RequestStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    $Enums.RequestStatusEnum.ACCEPTED,
    $Enums.RequestStatusEnum.READ,
    $Enums.RequestStatusEnum.REJECTED,
    $Enums.RequestStatusEnum.UNREAD,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status.`);
    }
    return value;
  }

  private isStatusValid(status: any): boolean {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
