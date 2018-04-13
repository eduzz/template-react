import React, { Component } from 'react';
import Collapse from 'material-ui/transitions/Collapse';
import Answer from './Answer';
import Loading from 'components/Loading';
import { getTime } from 'utils';

interface IProps {
  comment: any;
  openAnswer: any;
}

interface IState {
  isAnswersOpen: boolean;
}

class Comment extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isAnswersOpen: false,
    };
  }

  handleToggleAnswers = () => {
    this.setState({
      isAnswersOpen: !this.state.isAnswersOpen,
    });

    this.props.openAnswer();
  }

  render() {
    return (
      <div className='comment'>
        <div className='container'>
          <div className='user-photo'>
            <img
              src='https://app.nutror.com//file/Uploads/629/simbolo_eduzz.png'
              alt=''
            />
          </div>
          <div className='content'>
            <h4 className='user-name'>Charlie Sheen</h4>{' '}
            <span className='comment-published-time'>
              {getTime(this.props.comment.created_at)}
            </span>
            <p className='comment-text'>
              {this.props.comment.text}
            </p>
            <div className='comment-user-actions'>
              <a className='action-link' onClick={this.handleToggleAnswers}>Respostas</a>
              {/* <div className='comment-form'>
                <div className='container'>
                  <div className='current-user-photo'>
                    <img
                      src='https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg'
                      alt=''
                    />
                  </div>
                  <div className='input-field'>
                    <textarea />
                  </div>
                </div>
                <a className='button comment-button'>
                  <span>Comentar</span>
                </a>
              </div> */}
            </div>
          </div>
        </div>

        <Collapse in={this.state.isAnswersOpen}>
          {this.props.comment.answers ?
            this.props.comment.answers.map((answer: any, index: number) =>
              <Answer key={index} answer={answer} />
            )
            :
            <Loading active={true}></Loading>
          }
        </Collapse>
      </div>
    );
  }
}

export default Comment;