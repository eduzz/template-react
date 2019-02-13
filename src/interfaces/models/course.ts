export interface ICourse {
  id: number;
  title: string;
  hash: string;
  type: number;
  customizations: {
    avatar?: string;
  };
}

export interface ICourseOptions {
  label: string;
  value: number;
  type: number;
}