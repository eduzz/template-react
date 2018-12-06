export interface IUpsellList {
  id: number;
  title: string;
  small_image?: string;
  total_view?: number;
  total_click?: number;
}

export interface IUpsellCourses {
  id: number;
  title: string;
  hash: string;
}

export interface IUpsellProduct {
  biling_type: string;
  content_id: number;
  content_type_id: number;
  has_children: boolean;
  image: string;
  producer_id: number;
  title: string;
  children?: IUpsellProductVariant[];
}

export interface IUpsellProductVariant {
  biling_type: string;
  content_id: number;
  content_type_id: number;
  has_children: boolean;
  image: string;
  producer_id: number;
  title: string;
}

export interface IUpsell {
  id: number;
  type: number;
  content_id: number;
  pre_content_id: number;
  description: string;
  title: string;
  label_text: string;
  show_type: number;
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
  courses: {
    id: number;
    title: string;
    course_page: boolean;
    upc_cod: number;
    modules: {
      id: number;
      title: string;
      course_id: number;
      lessons: {
        id: number;
        title: string;
        module_id: number;
        checked: boolean;
      }[];
      checked: boolean;
    }[];
  }[];
}

export interface IUpsellCourse {
  id: number;
  title: string;
  course_page: boolean;
  modules: {
    id: number;
    title: string;
    lessons: {
      id: number;
      title: string;
      module_id: number;
      checked: boolean;
    }[];
    checked: boolean;
  }[];
}
