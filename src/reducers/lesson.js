const lesson = (state = {}, action) => {
    switch (action.type) {
        case 'GET_LESSON':
            return {};
        case 'RECEIVE_LESSON':
            return {
                ...action.lesson,
                chats: {
                    ...action.lesson.chats,
                    hasjivochat: !!parseInt(action.lesson.chats.hasjivochat, 10),
                    haszopimchat: !!parseInt(action.lesson.chats.haszopimchat, 10),
                    hastawktochat: !!parseInt(action.lesson.chats.hastawktochat, 10),
                    haszendeskchat: !!parseInt(action.lesson.chats.haszendeskchat, 10),
                    haslivechat: !!parseInt(action.lesson.chats.haslivechat, 10),
                    haschatroll: !!parseInt(action.lesson.chats.haschatroll, 10),
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
        case 'ADD_LESSON_FILES':
            return {
                ...state,
                lesson_files: [
                    ...state.lesson_files,
                    ...action.files,
                ],
            };
        case 'REMOVE_LESSON_FILE':
            return {
                ...state,
                lesson_files: state.lesson_files.filter((file, i) => action.index !== i),
            };
        default:
            return state;
    }
};

export default lesson;
