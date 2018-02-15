const lesson = (state = [], action) => {
    switch (action.type) {
        case 'GET_LESSON':
            return [];
        case 'RECEIVE_LESSON':
            return [...action.lesson];
        case 'RECEIVE_LESSON_ERROR':
            return [];
        default:
            return state;
    }
};

export default lesson;
