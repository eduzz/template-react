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

export const fetchCourses = (options: any) =>
  async (dispatch: Function) => {
    dispatch(cleanCourses());

    try {
      const response = await get({ ...options });

      dispatch(receiveCourses(response.data.data));
    } catch (error) {
      dispatch(receiveCoursesError(error));
    }
  };
