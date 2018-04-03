import { get, put, post, del } from 'agent';

const receiveCourse = (course: any) => ({
  type: 'RECEIVE_COURSE',
  course,
});

const deleteCourseSuccess = (res: any) => ({
  type: 'DELETE_COURSE_SUCCESS',
  res,
});

const receiveCourseProgress = (progress: number) => ({
  type: 'RECEIVE_COURSE_PROGRESS',
  progress,
});

export const cleanCourse = () => ({
  type: 'CLEAN_COURSE'
});

export const fetchCourse = (courseID: number) => (dispatch: Function) => {
  dispatch(cleanCourse());

  get({ url: '/learner/course/' + courseID }).then(
    res => dispatch(receiveCourse(res.data.data))
  );
};

export const fetchCourseProgress = (courseID: number) =>
  (dispatch: Function) => {
    get({ url: '/learner/course/' + courseID + '/progress' }).then(
      res => dispatch(receiveCourseProgress(res.data.data.progress))
    );
  };

export const deleteCourse = (courseID: number) => (dispatch: Function) => {
  dispatch({
    type: 'DELETE_COURSE',
    courseID,
  });

  del({ url: '/courses/' + courseID }).then(
    res => dispatch(deleteCourseSuccess(res))
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
    res => console.log('course -> ', res.data.data)
  );
};

export const updateCourse = (course: any) => (dispatch: Function) => {
  dispatch({
    type: 'UPDATE_COURSE',
    course,
  });

  put({ url: '/courses/' + course.id, data: course }).then(
    res => console.log('course -> ', res.data.data)
  );
};

export const receiveCourseImageCover = (imageCover: string) => ({
  type: 'RECEIVE_COURSE_IMAGE_COVER',
  imageCover,
});

export const cleanCourseImageCover = () => ({
  type: 'CLEAN_COURSE_IMAGE_COVER',
});
