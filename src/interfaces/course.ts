export interface ICourse {
  id: number;
  title: string;
  description?: string;
  logo?: string;
  slug: string;
  published?: boolean;
  hash: string;
  default_thumb?: string;
  customizations: {
    avatar?: string;
    image_cover?: string;
  };
  category: {
    id: number;
    name: string;
  };
  producer: {
    id: number;
    name: string;
    business_name: string;
    avatar?: string;
  };
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
}