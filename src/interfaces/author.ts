export interface IAuthor {
  id: number;
  name: string;
  description: string;
  avatar: string;
  id_user?: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}