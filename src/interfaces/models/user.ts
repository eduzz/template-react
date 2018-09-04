export interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;

  createdDate?: Date;
  updatedDate?: Date;
}

export enum enRoles {
  sysAdmin = 'sysAdmin',
  admin = 'admin',
  user = 'user'
}