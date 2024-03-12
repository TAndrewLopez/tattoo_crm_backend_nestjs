import { $Enums } from '@prisma/client';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetRequestFilterDto {
  @IsOptional()
  @IsIn([$Enums.ColorSchemeEnum.BLACK_AND_WHITE, $Enums.ColorSchemeEnum.COLOR])
  colorScheme: $Enums.ColorSchemeEnum;

  @IsOptional()
  @IsIn([
    $Enums.RequestStatusEnum.ACCEPTED,
    $Enums.RequestStatusEnum.READ,
    $Enums.RequestStatusEnum.REJECTED,
    $Enums.RequestStatusEnum.UNREAD,
  ])
  status: $Enums.RequestStatusEnum;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
