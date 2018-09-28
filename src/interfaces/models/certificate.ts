export interface ICertificate {
  id: number;
  title: string;
  image: string;
  config: string;
  created_at: Date;
  user_id: number;
  default: boolean;
}

export interface ICertificateCourse {
  id: number;
  title: string;
  has_selected: boolean;
}