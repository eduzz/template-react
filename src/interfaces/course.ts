import { IAuthor } from './author';
import { ICategory } from './category';
import { IStoreItemStatus } from './storeItemStatus';
import { fakeBoolean } from './types';

export interface ICourse extends IStoreItemStatus {
  id: number;
  title: string;
  description?: string;
  logo?: string;
  slug: string;
  published?: fakeBoolean;
  hash: string;
  default_thumb?: string;
  customizations: {
    avatar?: string;
    image_cover?: string;
  };
  category: Partial<ICategory>;
  producer: {
    id: number;
    name: string;
    business_name: string;
    avatar?: string;
  };
  author: Partial<IAuthor>;
}