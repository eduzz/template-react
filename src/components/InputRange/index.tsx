import React, { Component } from 'react';

interface IProps {
  title?: string;
  description?: string;
  min: number;
  max: number;
  onChange?: Function;
  value: string | number;
}

interface IState {
  value: string | number;
}

class InputRange extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: props.value ? props.value : ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e: any, onChange: Function) => {
    this.setState({ value: e.target.value });
    if (onChange) {
      onChange();
    }
  }

  render() {
    return (
      <div>
        <h3 className='form-block-title'>{this.props.title}</h3>
        <p className='input-description'>{this.props.description}</p>
        <div className='input-field'>
          <input
            type='range'
            min={this.props.min}
            max={this.props.max}
            value={this.state.value}
            onChange={e => this.handleChange(e, this.props.onChange)}
          />
        </div>
      </div>
    );
  }
}

export default InputRange;
