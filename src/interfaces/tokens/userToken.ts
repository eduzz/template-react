export default interface IUserToken {
  id: number;
  email: string;
  name: string;
  roles: string[];
  exp: number;
  type: enUserType;

  firstName?: string;
}

export enum enUserType {
  PRODUCER = 1,
  LEARNER = 2
}