import { IAuthor } from './author';
import { ICategory } from './category';
import { fakeBoolean } from './types';

export enum enCourseAccessType {
  paid = 0,
  free = 1,
  freeWithAccount = 2
}

export interface ICourse {
  //from list
  id: number;
  title: string;
  description?: string;
  logo?: string;
  slug: string;
  published?: fakeBoolean;
  hash: string;
  defaultThumb?: string;
  customizations: {
    avatar?: string;
    imageCover?: string;
  };
  category: Partial<ICategory>;
  producer: {
    id: number;
    name: string;
    businessName: string;
    avatar?: string;
  };
  author: Partial<IAuthor>;

  // from get
  progressBar?: any;
  offer?: any;
  fcPixel?: any;
  glAnalytics?: any;
  allowManualWatch?: number;
  isMy?: any;
  totalModules?: number;
  totalLessons?: number;
  share: string;

  advanced?: ICourseAdvanced;
  customization?: ICourseCustomization;
}

export interface ICourseAdvanced {
  disableComments: fakeBoolean;
  accessType: enCourseAccessType;
  replyEmail?: string;
  hasTerms: fakeBoolean;
  termsContent?: string;
  advertise: fakeBoolean;
  daysAvailable: number;
  newModuleNotification: fakeBoolean;
  newLessonNotification: fakeBoolean;
  allowManualWatch: fakeBoolean;
  releaseAt?: Date;

  emailNotification: fakeBoolean;
}

export interface ICourseCustomization {
  id: number;
  idCourse: number;

  titleColor?: string;
  headerLinkColor?: string;
  headerBackgroundColor?: string;
  coverBackgroundColor?: string;
  loginBackgroundColor?: string;

  imageCover?: string;
  imageAvatar?: string;
  logoLogin?: string;
  loginBackgroundImage?: string;

  cssUrl?: string;
}