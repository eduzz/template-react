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
          haschatroll: !!parseInt(action.lesson.chats.haschatroll, 10)
        }
      };
    case 'RECEIVE_AUTHOR':
      return {
        ...state,
        id_author: action.author.id
      };
    case 'RECEIVE_LESSON_ERROR':
      return {};
    case 'CHANGE_LESSON_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'ADD_LESSON_FILES': {
      const files = [...action.files].map(file => ({
        front_id: action.frontId,
        title: file.name,
        size: file.size,
        mimetype: file.type.substring(file.type.indexOf('/') + 1),
        progress: 0
      }));

      return {
        ...state,
        lesson_files: [...state.lesson_files, ...files]
      };
    }
    case 'REMOVE_LESSON_FILE':
      return {
        ...state,
        lesson_files: state.lesson_files.filter((file, i) => action.index !== i)
      };
    case 'UPLOAD_LESSON_FILE_PROGRESS': {
      const files = [...state.lesson_files];

      files[action.fileIndex].progress =
        action.progressEvent.loaded / action.progressEvent.total * 100;

      return {
        ...state,
        lesson_files: files
      };
    }
    default:
      return state;
  }
};

export default lesson;
