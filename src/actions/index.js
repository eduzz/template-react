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

export const getCourse = id => ({
	type: 'GET_COURSE',
	id
});

export const receiveCourse = course => ({
	type: 'RECEIVE_COURSE',
	course,
});

export const receiveCourseError = err => ({
	type: 'RECEIVE_COURSE_ERROR',
	err,
});

export const getLessons = moduleID => ({
	type: 'GET_LESSONS',
	moduleID
});

export const receiveLessons = lessons => ({
	type: 'RECEIVE_LESSONS',
	lessons,
});

export const receiveLessonsError = err => ({
	type: 'RECEIVE_LESSONS_ERROR',
	err,
});
