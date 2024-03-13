import { $Enums } from '@prisma/client';

export interface IConsultation {
  id: number;
  date: Date;
  status: $Enums.ConsultationStatusEnum;
  requestId: number;
}
