import { get } from 'agent';

const receiveCourses = courses => ({
  type: 'RECEIVE_COURSES',
  courses
});

const receiveCoursesError = err => ({
  type: 'RECEIVE_COURSES_ERROR',
  err
});

const cleanCourses = () => ({
  type: 'CLEAN_COURSES'
});

export const fetchCourses = () => dispatch => {
  dispatch(cleanCourses());

  return get({ url: '/courses?page=1&size=9999' }).then(
    res => dispatch(receiveCourses(res.data.data)),
    err => dispatch(receiveCoursesError(err))
  );
};
