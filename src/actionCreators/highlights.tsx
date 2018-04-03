import { get } from 'agent';

const receiveHighlights = (highlights: any) => ({
  type: 'RECEIVE_HIGHLIGHTS',
  highlights,
});

export const fetchHighlights = () =>
  (dispatch: any) => {
    get({ url: '/user/highlights' }).then(
      res => dispatch(receiveHighlights(res.data.data))
    );
  };