import { get } from 'agent';
import { increaseLoading, decreaseLoading } from './loading';

const receiveCourses = (courses: Array<Object>) => ({
  type: 'RECEIVE_COURSES',
  courses
});

const cleanCourses = () => ({
  type: 'CLEAN_COURSES'
});

export const fetchCourses = (type: string) =>
  (dispatch: Function) => {
    dispatch(cleanCourses());
    dispatch(increaseLoading());

    get({ url: type === 'producer' ? '/courses' : '/user/courses' }).then(
      res => {
        dispatch(receiveCourses(res.data.data));

        dispatch(decreaseLoading());
      }
    );
  };
