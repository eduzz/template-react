import { get } from 'agent';

const receiveCourses = (courses: Array<Object>) => ({
  type: 'RECEIVE_COURSES',
  courses
});

const receiveCoursesError = (err: any) => ({
  type: 'RECEIVE_COURSES_ERROR',
  err
});

const cleanCourses = () => ({
  type: 'CLEAN_COURSES'
});

export const fetchCourses = () => (dispatch: Function) => {
  dispatch(cleanCourses());

  return get({ url: '/courses?page=1&size=9999' }).then(
    res => dispatch(receiveCourses(res.data.data)),
    err => dispatch(receiveCoursesError(err))
  );
};
