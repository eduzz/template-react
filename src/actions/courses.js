export const getCourses = () => ({
	type: 'GET_COURSES',
});

export const receiveCourses = courses => ({
	type: 'RECEIVE_COURSES',
	courses,
});

export const receiveCoursesError = err => ({
	type: 'RECEIVE_COURSES_ERROR',
	err,
});