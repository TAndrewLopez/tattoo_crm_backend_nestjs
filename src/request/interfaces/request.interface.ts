import { $Enums } from '@prisma/client';

export interface IRequest {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: number;
  pronouns?: string;
  size: string;
  placement: string;
  colorScheme: $Enums.ColorSchemeEnum;
  description: string;
  status: $Enums.RequestStatusEnum;
  appointmentAmount?: number;
  userId?: number;
  organizationId?: number;
}
