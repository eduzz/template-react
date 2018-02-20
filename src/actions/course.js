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

export const getCourseCustomization = courseID => ({
    type: 'GET_COURSE_CUSTOMIZATION',
    courseID,
});

export const receiveCourseCustomization = customization => ({
    type: 'RECEIVE_COURSE_CUSTOMIZATION',
    customization,
});

export const receiveCourseCustomizationError = err => ({
    type: 'RECEIVE_COURSE_CUSTOMIZATION_ERROR',
    err,
});

export const createCourse = course => ({
    type: 'CREATE_COURSE',
    course,
});

export const updateCourse = course => ({
    type: 'UPDATE_COURSE',
    course,
});

export const changeCourseField = (field, value) => ({
    type: 'CHANGE_COURSE_FIELD',
    field,
    value,
});
