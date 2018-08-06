import { enRoles } from './user';

export interface IUserRole {
  role: enRoles;
  name: string;
  description?: string;
}