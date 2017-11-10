import * as courses from './courses';
import * as course from './course';
import * as modules from './modules';
import * as lessons from './lessons';
import * as search from './search';

export default {
	...courses,
	...course,
	...modules,
	...lessons,
	...search,
};