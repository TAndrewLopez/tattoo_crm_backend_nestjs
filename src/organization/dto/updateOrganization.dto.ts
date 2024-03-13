import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
