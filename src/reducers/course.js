const course = (state = {}, action) => {
    switch (action.type) {
        case 'RECEIVE_COURSE':
            return {...action.course};
        case 'RECEIVE_COURSE_ERROR':
            return {};
        default:
            return state;
    }
};

export default course;
