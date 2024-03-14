import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrgsAndUsersDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  organizationId: number;
}
