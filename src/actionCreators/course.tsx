import { get, put, post, del } from 'agent';

export const cleanCourse = () => ({
  type: 'CLEAN_COURSE'
});

const receiveCourse = (course: any) => ({
  type: 'RECEIVE_COURSE',
  course,
});

const receiveCourseError = (err: any) => ({
  type: 'RECEIVE_COURSE_ERROR',
  err,
});

export const fetchCourse = (courseID: number) => (dispatch: Function) => {
  dispatch(cleanCourse());

  get({ url: '/learner/course/' + courseID }).then(
    res => dispatch(receiveCourse(res.data.data)),
    err => dispatch(receiveCourseError(err))
  );
};

// export const fetchCourseProgress = (courseID: number) =>
//   (dispatch: Function) => {
//     get({ url: ''})
//   };

const deleteCourseSuccess = (err: any) => ({
  type: 'DELETE_COURSE_SUCCESS',
  err,
});

const deleteCourseError = (err: any) => ({
  type: 'DELETE_COURSE_ERROR',
  err,
});

export const deleteCourse = (courseID: number) => (dispatch: Function) => {
  dispatch({
    type: 'DELETE_COURSE',
    courseID,
  });

  del({ url: '/courses/' + courseID }).then(
    res => dispatch(deleteCourseSuccess(res)),
    err => dispatch(deleteCourseError(err))
  );
};

export const changeCourseField = (field: string, value: any) => ({
  type: 'CHANGE_COURSE_FIELD',
  field,
  value,
});

export const createCourse = (course: Object) => (dispatch: Function) => {
  dispatch({
    type: 'CREATE_COURSE',
    course,
  });

  post({ url: '/courses/', data: course }).then(
    res => console.log('course -> ', res.data.data),
    err => console.error('course -> ', err)
  );
};

export const updateCourse = (course: any) => (dispatch: Function) => {
  dispatch({
    type: 'UPDATE_COURSE',
    course,
  });

  put({ url: '/courses/' + course.id, data: course }).then(
    res => console.log('course -> ', res.data.data),
    err => console.error('course -> ', err)
  );
};

export const receiveCourseImageCover = (imageCover: string) => ({
  type: 'RECEIVE_COURSE_IMAGE_COVER',
  imageCover,
});

export const cleanCourseImageCover = () => ({
  type: 'CLEAN_COURSE_IMAGE_COVER',
});
