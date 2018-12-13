import { IModule } from './module';

export interface IUpsellList {
  id: number;
  title: string;
  small_image?: string;
  total_view?: number;
  total_click?: number;
}

export interface IUpsellProduct {
  biling_type: string;
  content_id: string;
  content_type_id: number;
  has_children: boolean;
  image: string;
  producer_id: number;
  title: string;
  children?: IUpsellProductVariant[];
}

export interface IUpsellProductVariant {
  biling_type: string;
  content_id: string;
  content_type_id: number;
  has_children: boolean;
  image: string;
  producer_id: number;
  title: string;
}

export interface IUpsell {
  id: number;
  type: number;
  content_id: string;
  pre_content_id: string;
  description: string;
  title: string;
  label_text: string;
  show_type: number;
  has_selected_lessons: boolean;
  has_selected_courses: boolean;
  highlight_images: {
    large: string;
    medium: string;
    small: string;
  };
  small_image: string;
  highlight: boolean;
  offer_shelf: boolean;
  published: boolean;
  user_id: number;
  created_at: string;
  external_url: string;
  course_hash: string;
  courses: IUpsellCourse[];
}

export interface IUpsellCourse {
  id: number;
  hash?: string;
  title: string;
  course_page: boolean;
  upc_cod: number;
  customizations: {
    avatar: string;
  };
  modules: IModule[];
}
