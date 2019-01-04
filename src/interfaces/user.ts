export interface IUser {
  id?: number;
  firstName: string;
  lastName?: string;
  fullName?: string;
  email: string;
  password?: string;

  createdDate?: Date;
  updatedDate?: Date;
}