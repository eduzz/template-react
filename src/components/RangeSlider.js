import React, { Component } from 'react';

export default class RangeSlider extends Component
{
	state = { SliderValue: 90};
	handleSlider = (event) => {
	    this.setState({SliderValue: event.target.value});
	};
    render() 
    {
        return (
		    <div className="range-field">
		      <input type="range" id="test5" min="0" max="100" value={this.state.SliderValue} onChange={this.handleSlider} />
		        <h3 className="form-block-title">{this.state.SliderValue} %</h3>
		    </div>
        );
    }
}