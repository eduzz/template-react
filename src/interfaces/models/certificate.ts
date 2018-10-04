export interface ICertificate {
  id?: number;
  title: string;
  image: string;
  config: string;
  user_id?: number;
  default: boolean;

  created_at?: Date;
}

export interface ICertificateCourse {
  id: number;
  title: string;
  has_selected: boolean;
}