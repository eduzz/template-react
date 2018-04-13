import { get, put, post, del } from 'agent';
import { increaseLoading, decreaseLoading } from './loading';

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

const receiveCourseNews = (news: any) => ({
  type: 'RECEIVE_COURSE_NEWS',
  news,
});

export const cleanCourse = () => ({
  type: 'CLEAN_COURSE'
});

export const fetchCourse = (courseID: number) => (dispatch: Function) => {
  dispatch(cleanCourse());
  dispatch(increaseLoading());

  get({ url: '/learner/course/' + courseID }).then(
    res => {
      dispatch(receiveCourse(res.data.data));

      dispatch(decreaseLoading());
    }
  );
};

export const fetchCourseProgress = (courseID: number) =>
  (dispatch: Function) => {
    dispatch(increaseLoading());
    get({ url: '/learner/course/' + courseID + '/progress' }).then(
      res => {
        dispatch(receiveCourseProgress(res.data.data.progress));

        dispatch(decreaseLoading());
      }
    );
  };

export const fetchCourseNews = (courseID: number) =>
  (dispatch: Function) => {
    dispatch(increaseLoading());
    get({ url: '/learner/course/' + courseID + '/news' }).then(
      res => {
        dispatch(receiveCourseNews(res.data.data));

        dispatch(decreaseLoading());
      }
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
