import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actionCreators/authors';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';

const styles = require('./styles.css');

interface IProps {
  fetchAuthors: any;
  cleanAuthors: any;
  authors: Array<any>;
  value: string;
  onChange: any;
  addAuthor: any;
}

interface IState {
  newAuthorName: string;
}

class AuthorSelect extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      newAuthorName: '',
    };
  }

  componentDidMount() {
    this.props.fetchAuthors();
  }

  componentWillUnmount() {
    this.props.cleanAuthors();
  }

  render() {
    return (
      <div className={styles.component}>
        <div className='input-field'>
          <Select
            value={this.props.value}
            onChange={this.props.onChange}
            fullWidth
          >
            {this.props.authors.map(author => (
              <MenuItem
                key={author.id}
                value={author.id}
              >
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <Card className='card-lessons'>
          <CardHeader>
            <span style={{ display: 'flex', justifyContent: 'center' }}>
              Adicionar Author
            </span>
          </CardHeader>
          <CardContent className='card-lessons-wrapper'>
            <TextField
              onChange={(e: any) => {
                this.setState({
                  newAuthorName: e.target.value
                });
              }}
              fullWidth
            />
            <a
              onClick={() => {
                this.props.addAuthor(this.state.newAuthorName);
              }}
              className='button affirmative waves-effect waves-light'
            >
              <span>Adicionar</span>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  authors: state.authors
});

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSelect);
