import { combineReducers } from 'redux';
import courses from './courses';
import searchFilter from './searchFilter';
import course from './course';
import auth from './auth';
import user from './user';
import categories from './categories';
import authors from './authors';
import modules from './modules';
import upload from './upload';
import lesson from './lesson';
import pageGrid from './pageGrid';
import highlights from './highlights';

const nutrorApp = combineReducers({
  courses,
  searchFilter,
  course,
  auth,
  user,
  categories,
  authors,
  modules,
  upload,
  lesson,
  pageGrid,
  highlights
});

export default nutrorApp;

export const getVisibleCourses = (state: any, filter = '') => {
  return state.courses.filter((course: any) =>
    course.title.toLowerCase().includes(filter.toLowerCase())
  );
};
