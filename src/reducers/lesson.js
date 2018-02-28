const lesson = (state = {}, action) => {
    switch (action.type) {
        case 'GET_LESSON':
            return {};
        case 'RECEIVE_LESSON':
            return {
                ...action.lesson,
                chats: {
                    ...action.lesson.chats,
                    hasjivochat: !!parseInt(action.lesson.chats.hasjivochat),
                    haszopimchat: !!parseInt(action.lesson.chats.haszopimchat),
                    hastawktochat: !!parseInt(action.lesson.chats.hastawktochat),
                    haszendeskchat: !!parseInt(action.lesson.chats.haszendeskchat),
                    haslivechat: !!parseInt(action.lesson.chats.haslivechat),
                    haschatroll: !!parseInt(action.lesson.chats.haschatroll),
                },
            };
        case 'RECEIVE_AUTHOR':
            return {
                ...state,
                id_author: action.author.id,
            };
        case 'RECEIVE_LESSON_ERROR':
            return {};
        case 'CHANGE_LESSON_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };
        default:
            return state;
    }
};

export default lesson;
