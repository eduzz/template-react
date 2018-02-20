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
                lesson_files: [
                    {
                        id_lesson_file: 1,
                        id_lesson: action.lesson.id,
                        file_name: 'download-link',
                        size: 1000,
                        title: 'Apostila de Marketing',
                        mimetype: 'pdf',
                        created_at: '2016-09-08 19:24:12.000',
                    },
                    {
                        id_lesson_file: 2,
                        id_lesson: action.lesson.id,
                        file_name: 'download-link',
                        size: 1000,
                        title: 'Template de ficha de cadastro',
                        mimetype: 'doc',
                        created_at: '2016-09-08 19:24:12.000',
                    },
                    {
                        id_lesson_file: 3,
                        id_lesson: action.lesson.id,
                        file_name: 'download-link',
                        size: 1000,
                        title: 'Planilha de dados para testes',
                        mimetype: 'xls',
                        created_at: '2016-09-08 19:24:12.000',
                    },
                ],
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
        case 'ADD_LESSON_FILE':
            return {
                ...state,
                lesson_files: [
                    ...state.lesson_files,
                    {...action.file},
                ],
            };
        default:
            return state;
    }
};

export default lesson;
