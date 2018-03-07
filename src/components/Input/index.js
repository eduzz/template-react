import React from 'react';
import { v4 } from 'uuid';

class Input extends React.Component {
  constructor() {
    super();

    this.id = v4();
  }

  handleFocus = e => {
    const temp = e.target.value;
    e.target.value = '';
    e.target.value = temp;
  };

  render() {
    return (
      <div className={`input-field ${this.props.className}`}>
        <label
          htmlFor={this.props.id || this.id}
          className={
            this.props.defaultValue || this.props.value ? 'active' : ''
          }
        >
          {this.props.floatlabel}
        </label>
        <input
          id={this.id}
          type="text"
          key={
            this.props.async && this.props.defaultValue
              ? 'notLoadedYet'
              : 'loaded'
          }
          onFocus={this.handleFocus}
          {...this.props}
        />
        <span className="right-label">{this.props.rightlabel}</span>
      </div>
    );
  }
}

export default Input;
