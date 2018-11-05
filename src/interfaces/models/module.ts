import { ILesson } from './lesson';

export interface IModule {
  id?: number;
  name: string;
  index?: number | string;
  lessons: ILesson[];
}