export interface IAuthor {
  id: number;
  name: string;
  description: string;
  avatar: string;

  idUser?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}