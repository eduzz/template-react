export const getCourse = courseID => ({
	type: 'GET_COURSE',
    courseID,
});

export const cleanCourse = () => ({
    type: 'CLEAN_COURSE',
});

export const receiveCourse = course => ({
	type: 'RECEIVE_COURSE',
	course,
});

export const receiveCourseError = err => ({
	type: 'RECEIVE_COURSE_ERROR',
	err,
});

export const deleteCourse = courseID => ({
    type: 'DELETE_COURSE',
    courseID,
});

export const deleteCourseSuccess = () => ({
    type: 'DELETE_COURSE_SUCCESS',
});

export const deleteCourseError = () => ({
    type: 'DELETE_COURSE_ERROR',
});
