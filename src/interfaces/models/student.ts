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
  last_used_at_start: Date;
  last_used_at_end: Date;
}

export interface IStudentCourse {
  id?: number;
  title: string;
  avatar: string;
  created_at: string;
  type: number;
}

export interface IStudentActivity {
  data: {
    subdomain: null;
    requestUri: string;
    origin: string;
    host: string;
    referer: string;
    ip: string;
    usr_cod: number;
    usr_email: string;
    usr_type: number;
    action: string;
    message: string;
  };
  date: string;
}