export default interface IUser {
  id?: number;
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;

  fullName?: string;

  createdDate?: Date;
  updatedDate?: Date;
}