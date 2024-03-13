import { BadRequestException, PipeTransform } from '@nestjs/common';
import { $Enums } from '@prisma/client';

import { IRequest } from '../interfaces/request.interface';

export class UpdateRequestValidationPipe implements PipeTransform {
  private readonly allowedProperties: Array<keyof IRequest>;

  constructor() {
    this.allowedProperties = [
      'fullName',
      'email',
      'phoneNumber',
      'pronouns',
      'size',
      'placement',
      'colorScheme',
      'description',
      'status',
      'appointmentAmount',
      'userId',
      'organizationId',
    ];
  }

  transform(value: any) {
    this.isValidChanges(value);
    return value;
  }
  private isValidChanges(value: any) {
    const keys = Object.keys(value);
    for (const key of keys) {
      if (!this.allowedProperties.includes(key as keyof IRequest)) {
        throw new BadRequestException(
          `Property ${key} is not allowed for update.`,
        );
      }

      switch (key) {
        case 'phoneNumber':
        case 'appointmentAmount':
        case 'userId':
        case 'organizationId':
          if (value[key] !== undefined && typeof value[key] !== 'number') {
            throw new BadRequestException(`${key} should be of type number.`);
          }
          break;

        case 'colorScheme':
          if (
            value[key] &&
            !Object.values($Enums.ColorSchemeEnum).includes(value[key])
          ) {
            throw new BadRequestException(`Invalid value for ${key}`);
          }
          break;

        case 'status':
          if (
            value[key] &&
            !Object.values($Enums.RequestStatusEnum).includes(value[key])
          ) {
            throw new BadRequestException(
              `Status should be one of the following values: ${[$Enums.RequestStatusEnum.ACCEPTED, $Enums.RequestStatusEnum.READ, $Enums.RequestStatusEnum.REJECTED, $Enums.RequestStatusEnum.UNREAD].join(', ')}.`,
            );
          }
          break;
      }
    }
  }
}
