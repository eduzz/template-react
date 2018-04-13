import React from 'react';
import { getTime } from 'utils';

const Answer = ({ answer }: any) => (
  <div className='answers'>
    <div className='comment'>
      <div className='container'>
        <div className='user-photo'>
          <img
            src='https://app.nutror.com//file/Uploads/629/simbolo_eduzz.png'
            alt=''
          />
        </div>
        <div className='content'>
          <h4 className='user-name'>{answer.user.name}</h4>{' '}
          <span className='comment-published-time'>
            {getTime(answer.created_at)}
          </span>
          <p className='comment-text'>
            {answer.text}
          </p>
          {/* <div className='comment-user-actions'>
            <a className='action-link'>Responder</a>{' '}
            <a className='action-link'>Curtir</a>
          </div> */}
        </div>
      </div>
    </div>
  </div>
);

export default Answer;