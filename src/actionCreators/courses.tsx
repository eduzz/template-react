import { get } from 'agent';
import { increaseLoading, decreaseLoading } from './loading';

const receiveCourses = (courses: Array<Object>, totalPages: any) => ({
  type: 'RECEIVE_COURSES',
  courses,
  totalPages,
});

export const cleanCourses = () => ({
  type: 'CLEAN_COURSES'
});

export const fetchCourses = (type: string, page: number, size: number) =>
  (dispatch: Function) => {
    dispatch({
      type: 'FETCH_COURSES',
    });
    dispatch(increaseLoading());

    get({ url: (type === 'producer' ? '/courses' : '/user/courses') + `?page=${page}&size=${size}` }).then(
      res => {
        dispatch(receiveCourses(res.data.data, res.data.paginator.totalPages));
        dispatch(decreaseLoading());
    );
  };
