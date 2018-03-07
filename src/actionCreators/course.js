import { get, put, post, del } from 'agent';

export const cleanCourse = () => ({
  type: 'CLEAN_COURSE'
});

const receiveCourse = course => ({
  type: 'RECEIVE_COURSE',
  course
});

const receiveCourseError = err => ({
  type: 'RECEIVE_COURSE_ERROR',
  err
});

export const fetchCourse = courseID => dispatch => {
  dispatch(cleanCourse());

  get({ url: '/courses/' + courseID }).then(
    res => dispatch(receiveCourse(res.data.data)),
    err => dispatch(receiveCourseError(err))
  );
};

const deleteCourseSuccess = () => ({
  type: 'DELETE_COURSE_SUCCESS'
});

const deleteCourseError = err => ({
  type: 'DELETE_COURSE_ERROR',
  err
});

export const deleteCourse = courseID => dispatch => {
  dispatch({
    type: 'DELETE_COURSE',
    courseID
  });

  del({ url: '/courses/' + courseID }).then(
    res => dispatch(deleteCourseSuccess(res)),
    err => dispatch(deleteCourseError(err))
  );
};

export const changeCourseField = (field, value) => ({
  type: 'CHANGE_COURSE_FIELD',
  field,
  value
});

export const createCourse = course => dispatch => {
  dispatch({
    type: 'CREATE_COURSE',
    course
  });

  post({ url: '/courses/', data: course }).then(
    res => console.log('course -> ', res.data.data),
    err => console.error('course -> ', err)
  );
};

export const updateCourse = course => dispatch => {
  dispatch({
    type: 'UPDATE_COURSE',
    course
  });

  put({ url: '/courses/' + course.id, data: course }).then(
    res => console.log('course -> ', res.data.data),
    err => console.error('course -> ', err)
  );
};
