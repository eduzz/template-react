import { get } from 'agent';

const receiveHighlights = (highlights: any) => ({
  type: 'RECEIVE_HIGHLIGHTS',
  highlights,
});

const receiveHighlightsError = (err: any) => ({
  type: 'RECEIVE_HIGHLIGHTS_ERROR',
  err,
});

export const fetchHighlights = () =>
  (dispatch: any) => {
    get({ url: '/courses/highlights' }).then(
      res => dispatch(receiveHighlights(res.data.data)),
      err => dispatch(receiveHighlightsError(err)),
    );
  };