import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from 'actionCreators/categories';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

interface IProps {
  fetchCategories: any;
  cleanCategories: any;
  categories: Array<any>;
  value: number;
  onChange: any;
}

class CategorySelect extends Component<IProps> {
  componentDidMount() {
    this.props.fetchCategories(this.props.categories);
  }

  componentWillUnmount() {
    this.props.cleanCategories();
  }

  render() {
    return (
      <div className='input-field'>
        <Select
          value={this.props.value}
          onChange={(event: any) => this.props.onChange(event.target.value, event)}
          fullWidth
        >
          {this.props.categories.map(option => (
            <MenuItem
              key={option.id}
              value={option.id}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  categories: state.categories
});

export default connect(mapStateToProps, actionCreators)(CategorySelect);
