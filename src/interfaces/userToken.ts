export interface IUserToken {
  id: number;
  email: string;
  name: string;
  exp: number;

  firstName: string;
  canAccess(...roles: string[]): boolean;
}