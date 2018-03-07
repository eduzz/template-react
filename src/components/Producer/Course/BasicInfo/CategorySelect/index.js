import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from 'actionCreators';
import { SelectField, MenuItem } from 'material-ui';

class CategorySelect extends Component {
  componentDidMount() {
    this.props.fetchCategories(this.props.categories);
  }

  componentWillUnmount() {
    this.props.cleanCategories();
  }

  render() {
    return (
      <div className="input-field">
        <SelectField
          {...this.props}
          floatingLabelText="Categoria"
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

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);
