import { $Enums } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  phoneNumber: number;

  @IsOptional()
  @IsString()
  pronouns?: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsString()
  placement: string;

  @IsNotEmpty()
  @IsEnum([
    $Enums.ColorSchemeEnum.BLACK_AND_WHITE,
    $Enums.ColorSchemeEnum.COLOR,
  ])
  colorScheme: $Enums.ColorSchemeEnum;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  description: string;

  @IsNotEmpty()
  @IsEnum([
    $Enums.RequestStatusEnum.ACCEPTED,
    $Enums.RequestStatusEnum.READ,
    $Enums.RequestStatusEnum.REJECTED,
    $Enums.RequestStatusEnum.UNREAD,
  ])
  status: $Enums.RequestStatusEnum;

  @IsOptional()
  @IsInt()
  appointmentAmount?: number;

  @IsOptional()
  @IsInt()
  userId?: number;

  // @IsOptional()
  // @IsInt()
  // organizationId?: number;
}
