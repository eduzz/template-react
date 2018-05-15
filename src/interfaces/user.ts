export interface IUser {
  id: number;
  name: string;
  email: string;
  course: string;
  group: string;

  //from Store
  index?: number;
  isFetching?: boolean;
  error?: any;
}