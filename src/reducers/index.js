import { combineReducers } from 'redux';
import courses from './courses';
import searchFilter from './searchFilter';
import course from './course';
import auth from './auth';
import user from './user';
import categories from './categories';
import authors from './authors';
import modules from './modules';

const nutrorApp = combineReducers({
	courses,
	searchFilter,
	course,
    auth,
    user,
    categories,
    authors,
    modules,
});

export default nutrorApp;

export const getVisibleCourses = (state, filter = '') => {
	return state.courses.filter(course => course.title.toLowerCase().includes(filter.toLowerCase()));
}
