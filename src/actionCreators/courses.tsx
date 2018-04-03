import { get } from 'agent';

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

    get({ url: type === 'producer' ? '/courses' : '/user/courses' }).then(
      res => dispatch(receiveCourses(res.data.data))
    );
  };
