import { IUser } from 'src/auth/interfaces/user.interface';

export interface IOrganization {
  id: number;
  name: string;
  userId: number;
  employees?: Partial<IUser>[];
}
