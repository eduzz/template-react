import { applyMiddleware } from 'redux';
import courses from './courses';
import course from './course';
import auth from './auth';
import categories from './categories';
import authors from './authors';
import modules from './modules';
import upload from './upload';

export default applyMiddleware(
    courses,
    course,
    auth,
    authors,
    categories,
    authors,
    modules,
    upload,
);
