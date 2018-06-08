import { IAuthor } from './author';
import { ICategory } from './category';
import { IStoreItemStatus } from './storeItemStatus';
import { fakeBoolean } from './types';

export enum enCourseAccessType {
  paid = 0,
  free = 1,
  freeWithAccount = 2
}

export interface ICourse extends IStoreItemStatus {
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

//TODO: create in api
export interface ICourseCustomization {
  primaryColor?: string;
  featuredColor?: string;

  thumbnailImage?: string;
  backgroundImage?: string;
  headerImage?: string;
}