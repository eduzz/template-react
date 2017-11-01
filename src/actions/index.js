export const searchCourses = text => ({
    type: 'SEARCH_COURSES',
    text,
});

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

export const getCourse = () => ({
	type: 'GET_COURSE',
});

export const receiveCourse = modules => ({
	type: 'RECEIVE_COURSE',
	modules,
});

export const receiveCourseError = err => ({
	type: 'RECEIVE_COURSE_ERROR',
	err,
});