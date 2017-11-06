import { combineReducers } from 'redux';
import courses from './courses';
import searchFilter from './searchFilter';
import course from './course';

const nutrorApp = combineReducers({
	courses,
	searchFilter,
	course,
});

export default nutrorApp;

export const getVisibleCourses = (state, filter = '') => {
	return state.courses.filter(course => course.title.toLowerCase().includes(filter.toLowerCase()));
}
