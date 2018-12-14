import { ILesson } from './lesson';

export interface IModule {
  id?: number;
  title: string;
  free_module: boolean;
  hidden_module: boolean;
  module_validity: number;
  module_scheduling: number;
  release_at: string;
  index?: number | string;
  checked?: boolean;
  lessons: ILesson[];
}