export interface IStudent {
  id: number;
  name: string;
  email: string;
  avatar: string;
  last_used_at: string;
}

export interface IFiltersModel {
  name: string;
  email: string;
  last_used_at_start: string;
  last_used_at_end: string;
}