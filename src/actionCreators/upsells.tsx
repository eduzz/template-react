import { get } from 'agent';
import { increaseLoading, decreaseLoading } from './loading';

const receiveUpsells = (upsells: Array<any>) => ({
  type: 'RECEIVE_UPSELLS',
  upsells,
});

export const fetchUpsells = (courseID: number) =>
  (dispatch: any) => {
    dispatch(increaseLoading());

    get({ url: `/learner/course/${courseID}/upsell` }).then(
      res => {
        dispatch(receiveUpsells(res.data.data || []));
        dispatch(decreaseLoading());
      },
      err => dispatch(decreaseLoading()),
    );
  };