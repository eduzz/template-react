export interface ICertificate {
  id: number;
  title: string;
  image: string;
  config: any;
  created_at: Date;
  user_id: number;
}

export interface ICertificateCourse {
  id: number;
  title: string;
  has_selected: boolean;
}