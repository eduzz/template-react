import React, { Component } from 'react';
import Icon from 'components/Icon';
import {
  FiltersMenu,
  ProducerFilter,
  PeriodFilter,
  StatusFilter,
  CategoryFilter,
  TagsFilter
} from 'components/Filters';

class CoursesFilters extends Component {
  constructor() {
    super();

    this.state = {
      isActive: false
    };
  }

  render() {
    return (
      <div>
        <FiltersMenu
          active={this.state.isActive}
          closeMenu={() =>
            this.setState({
              isActive: false
            })
          }
        >
          <ProducerFilter active />
          <PeriodFilter />
          <StatusFilter active />
          <CategoryFilter />
          <TagsFilter />
        </FiltersMenu>

        <a
          className="button outline-dark waves-light waves-effect"
          onClick={() =>
            this.setState({
              isActive: true
            })
          }
        >
          <Icon name="filter" />
          <span>Filtros</span>
        </a>
      </div>
    );
  }
}

export default CoursesFilters;
