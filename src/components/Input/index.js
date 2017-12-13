import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value : (props.value ? props.value : '')
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e, onChange) => {
        this.setState({ value: e.target.value });
        if (onChange) {
            onChange();
        }
    }

    render() {
        return (
            <div>
                <h3 className="form-block-title">{this.props.title}</h3>
                <p className="input-description">{this.props.description}</p>
                <div className="input-field">
                    <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e, this.props.onChange)}/>
                </div>
            </div>
        );
    }
    
}   

Input.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    onChange: PropTypes.func
}

export default Input;


