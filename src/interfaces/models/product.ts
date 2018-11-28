export interface IProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  content: string;
  variants?: IVariant[];
}

export interface IVariant {
  id: number;
  title: string;
  image: string;
  price: number;
  content: string;
}