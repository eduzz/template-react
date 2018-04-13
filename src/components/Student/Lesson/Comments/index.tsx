import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, fetchAnswers, sendComment } from 'actionCreators/comments';
import Comment from './Comment';

const styles = require('./styles.css');

interface IProps {
  lessonID: any;
  comments: any;
  fetchComments: any;
  fetchAnswers: any;
  sendComment: any;
}

interface IState {
  commentText: string;
}

class Comments extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      commentText: '',
    };
  }

  componentDidMount() {
    this.props.fetchComments(this.props.lessonID);
  }

  handleChangeCommentText = (e: any) => {
    this.setState({
      commentText: e.target.value,
    });
  }

  handleSendComment = () => {
    this.props.sendComment(this.props.lessonID, this.state.commentText);
  }

  render() {
    return (
      <div className={styles.component}>
        <div className='comments form-section'>
          <div className='row'>
            <div className='col s12'>
              <div className='form-block'>
                <h3 className='form-block-title'>Deixe seu comentário</h3>
                <div className='comment-form'>
                  <div className='container'>
                    <div className='current-user-photo'>
                      <img
                        src='https://app.nutror.com//file/Uploads/629/simbolo_eduzz.png'
                        alt=''
                      />
                    </div>
                    <div className='input-field'>
                      <textarea value={this.state.commentText} onChange={this.handleChangeCommentText} />
                    </div>
                  </div>
                  <a className='button comment-button' onClick={this.handleSendComment}>
                    <span>Comentar</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {this.props.comments.map((comment: any, index: any) =>
            <Comment
              key={index}
              comment={comment}
              openAnswer={() => {
                if (!comment.answers) {
                  this.props.fetchAnswers(this.props.lessonID, comment.id);
                }
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  comments: state.comments,
});

export default connect(mapStateToProps, { fetchComments, fetchAnswers, sendComment })(Comments);