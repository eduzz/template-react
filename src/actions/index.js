import * as courses from './courses';
import * as course from './course';
import * as lessons from './lessons';
import * as search from './search';
import * as login from './login';

export default {
	...courses,
	...course,
	...lessons,
	...search,
    ...login,
};
