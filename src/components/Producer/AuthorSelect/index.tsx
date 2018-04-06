import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from 'actionCreators/authors';
import Card, { CardActions } from 'material-ui/Card';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';

const styles = require('./styles.css');

interface IProps {
  fetchAuthors: any;
  cleanAuthors: any;
  authors: Array<any>;
  value: number;
  onChange: any;
  addAuthor: any;
}

interface IState {
  newAuthorName: string;
  isExpanded: boolean;
}

class AuthorSelect extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      newAuthorName: '',
      isExpanded: false,
    };
  }

  componentDidMount() {
    this.props.fetchAuthors();
  }

  componentWillUnmount() {
    this.props.cleanAuthors();
  }

  handleChangeTextField = (e: any) => {
    this.setState({
      newAuthorName: e.target.value
    });
  }

  handleAddNew = () => {
    this.props.addAuthor(this.state.newAuthorName);
  }

  handleExpand = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  render() {
    return (
      <div className={styles.component}>
        <div className='input-field'>
          <Select
            value={this.props.value}
            onChange={event => this.props.onChange(event.target.value, event)}
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

        <Card>
          <CardActions>
            <span style={{ display: 'flex', justifyContent: 'center' }}>
              Adicionar Author
            </span>
            <IconButton
              onClick={this.handleExpand}
              className={`expand-icon ${this.state.isExpanded && 'expanded'}`}
              aria-expanded={this.state.isExpanded}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.isExpanded} timeout='auto'>
            <TextField
              onChange={this.handleChangeTextField}
              fullWidth
            />
            <a
              onClick={this.handleAddNew}
              className='button affirmative waves-effect waves-light'
            >
              <span>Adicionar</span>
            </a>
          </Collapse>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  authors: state.authors
});

export default connect(mapStateToProps, actionCreators)(AuthorSelect);
