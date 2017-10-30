const courses = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_COURSES':
            return [...action.courses];
        case 'RECEIVE_COURSES_ERROR':
            return [];
        default:
            return state;
    }
};

export default courses;

export const getVisibleCourses = (state, filter) => {
	state.filter(course => course.title.includes(filter));
};