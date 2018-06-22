export interface IUserToken {
  id: number;
  email: string;
  firstName: string;
  lastName?: string;
  roles: string[];

  fullName: string;
  canAccess(...roles: string[]): boolean;
}