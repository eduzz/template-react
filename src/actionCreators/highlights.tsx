import { get } from 'agent';
import { increaseLoading, decreaseLoading } from './loading';

const receiveHighlights = (highlights: any) => ({
  type: 'RECEIVE_HIGHLIGHTS',
  highlights,
});

export const fetchHighlights = () =>
  (dispatch: any) => {
    dispatch(increaseLoading());

    get({ url: '/user/highlights' }).then(
      res => {
        dispatch(receiveHighlights(res.data.data));

        dispatch(decreaseLoading());
      }
    );
  };