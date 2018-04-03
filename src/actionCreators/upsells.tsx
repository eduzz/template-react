import { get } from 'agent';

const receiveUpsells = (upsells: Array<any>) => ({
  type: 'RECEIVE_UPSELLS',
  upsells,
});

export const fetchUpsells = (courseID: number) =>
  (dispatch: any) => {
    get({ url: `/learner/course/${courseID}/upsell` }).then(
      res => dispatch(receiveUpsells(res.data.data)),
    );
  };