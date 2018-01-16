export const getCourse = courseID => ({
	type: 'GET_COURSE',
    courseID,
});

export const receiveCourse = course => ({
	type: 'RECEIVE_COURSE',
	course,
});

export const receiveCourseError = err => ({
	type: 'RECEIVE_COURSE_ERROR',
	err,
});
