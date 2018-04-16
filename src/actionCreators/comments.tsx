import { get, post } from 'agent';

const receiveComments = (comments: Array<Object>) => ({
  type: 'RECEIVE_COMMENTS',
  comments,
});

const receiveComment = (comment: any) => ({
  type: 'RECEIVE_COMMENT',
  comment,
});

const receiveAnswers = (answers: any, commentID: any) => ({
  type: 'RECEIVE_ANSWERS',
  answers,
  commentID,
});

const cleanComments = () => ({
  type: 'CLEAN_COMMENTS',
});

export const fetchComments = (lessonID: any) =>
  (dispatch: Function) => {
    dispatch(cleanComments());

    get({ url: `/learner/lessons/${lessonID}/comments` }).then(
      res => dispatch(receiveComments(res.data.data))
    );
  };

export const sendComment = (lessonID: any, text: string) =>
  (dispatch: Function) => {
    post({ url: `/learner/lessons/${lessonID}/comments`, data: { text } }).then(
      res => dispatch(receiveComment(res.data.data))
    );
  };

export const fetchAnswers = (lessonID: any, commentID: any) =>
  (dispatch: Function) => {

    get({ url: `/learner/lessons/${lessonID}/comments/${commentID}` }).then(
      res => dispatch(receiveAnswers(res.data.data, commentID))
    );
  };