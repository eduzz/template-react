export interface IUserToken {
  id: number;
  email: string;
  name: string;
  exp: number;

  fullName: string;
  canAccess(...roles: string[]): boolean;
}