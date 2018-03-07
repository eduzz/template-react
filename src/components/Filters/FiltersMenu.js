import React, { Component } from 'react';
import jquery from 'jquery';

class FiltersMenu extends Component {
  componentDidMount() {
    jquery('.collapsible').collapsible();
  }

  render() {
    return (
      <div className={`filters ${this.props.active ? 'active' : ''}`}>
        <div className="filter-header">
          <h3 className="filter-header-title">Filtros</h3>
          <a className="filter-close" onClick={this.props.closeMenu}>
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.8 9.4l-4.2-4.2L25 20.8 9.4 5.2 5.2 9.4 20.8 25 5.2 40.6l4.2 4.2L25 29.2l15.6 15.6 4.2-4.2L29.2 25" />
            </svg>
          </a>
        </div>
        <div className="container">{this.props.children}</div>
        <div className="action-button">
          <a className="apply-filters button affirmative waves-effect waves-light">
            <span>Aplicar Filtros</span>
          </a>
        </div>
      </div>
    );
  }
}

export default FiltersMenu;
