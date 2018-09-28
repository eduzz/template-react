export interface IUserToken {
  id: number;
  email: string;
  name: string;
  exp: number;
  type: enUserType;

  firstName: string;
  canAccess(...roles: string[]): boolean;
}

export enum enUserType {
  PRODUCER = 1,
  LEARNER = 2
}