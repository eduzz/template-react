export const getCourseBasicInfo = courseId => ({
	type: 'GET_COURSE_BASIC_INFO',
    courseId,
});

export const receiveCourseBasicInfo = course => ({
	type: 'RECEIVE_COURSE_BASIC_INFO',
	course,
});

export const receiveCourseBasicInfoError = err => ({
	type: 'RECEIVE_COURSE_BASIC_INFO_ERROR',
	err,
});
