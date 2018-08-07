export interface IUser {
  id?: number;
  firstName: string;
  lastName?: string;
  fullName?: string;
  email: string;
  password?: string;
  roles: enRoles[];

  createdDate?: Date;
  updatedDate?: Date;
}

export enum enRoles {
  sysAdmin = 'sysAdmin',
  admin = 'admin',
  user = 'user'
}