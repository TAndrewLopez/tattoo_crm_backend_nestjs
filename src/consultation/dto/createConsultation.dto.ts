import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConsultationDto {
  @IsNotEmpty()
  @IsString()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  requestId: number;
}
