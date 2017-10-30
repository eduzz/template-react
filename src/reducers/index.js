import { combineReducers } from 'redux';
import courses from './courses';
import searchFilter from './searchFilter';

const nutrorApp = combineReducers({
	courses,
	searchFilter,
});

export default nutrorApp;

export const getVisibleCourses = (state, filter = '') => {
	return state.courses.filter(course => course.title.toLowerCase().includes(filter.toLowerCase()));
}
