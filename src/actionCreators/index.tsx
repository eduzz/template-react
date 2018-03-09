import * as courses from './courses';
import * as course from './course';
import * as lessons from './lessons';
import * as search from './search';
import * as auth from './auth';
import * as categories from './categories';
import * as authors from './authors';
import * as modules from './modules';
import * as upload from './upload';

export default {
  ...courses,
  ...course,
  ...lessons,
  ...search,
  ...auth,
  ...categories,
  ...authors,
  ...modules,
  ...upload
};
