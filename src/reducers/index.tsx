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
import highlights from './highlights';
import upsells from './upsells';
import rating from './rating';
import comments from './comments';
import loading from './loading';
import validateForm from './validateForm';

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
  highlights,
  upsells,
  rating,
  comments,
  loading,
  validateForm,
});

export default nutrorApp;

export const getVisibleCourses = (state: any, filter = '') => {
  return state.courses.filter((course: any) =>
    course.title.toLowerCase().includes(filter.toLowerCase())
  );
};
