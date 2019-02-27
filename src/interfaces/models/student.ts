export interface IStudent {
  id?: number;
  name: string;
  email: string;
  avatar: string;
  last_used_at?: string;
}

export interface IFiltersModel {
  name?: string;
  email?: string;
  last_used_at_start?: Date;
  last_used_at_end?: Date;
  course_name?: string;
  course_id?: string | number;
  type?: string | number;
}

export interface IStudentCourse {
  id: number;
  hash: string;
  title: string;
  type: number;
  avatar?: string;
  permission: {
    course: 7351
    delete: boolean
    insert: boolean
    read: boolean
    update: boolean
  };
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

export interface IStudentCourseAcquisition {
  id: number;
  status: boolean;
  accepted_termat: null;
  release_modules: boolean;
  expire_at: null;
  created_at: string;
  course_id: number;
}
