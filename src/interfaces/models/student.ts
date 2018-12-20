export interface IStudent {
  id?: number;
  name: string;
  email: string;
  avatar: string;
  last_used_at?: string;
}

export interface IFiltersModel {
  name: string;
  email: string;
  last_used_at_start: string;
  last_used_at_end: string;
}

export interface IStudentCourse {
  id?: number;
  title: string;
  avatar: string;
  created_at: string;
  type: number;
}

export interface IStudentActivity {
  id?: number;
  title: string;
  created_at: string;
}