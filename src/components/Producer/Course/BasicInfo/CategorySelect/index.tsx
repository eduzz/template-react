import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actionCreators/categories';
import { SelectField, MenuItem } from 'material-ui';

interface IProps {
  fetchCategories: any;
  cleanCategories: any;
  categories: Array<any>;
  value: number | string;
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
        <SelectField
          {...this.props}
          floatingLabelText='Categoria'
          style={{ width: '100%' }}
        >
          {this.props.categories.map(option => (
            <MenuItem
              key={option.id}
              value={option.id}
              primaryText={option.name}
            />
          ))}
        </SelectField>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  categories: state.categories
});

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);
