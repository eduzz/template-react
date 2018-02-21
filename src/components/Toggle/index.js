import React from 'react';
import PropTypes from 'prop-types';

const Toggle = (props) => (
    <div className="switch">
        <label>
            <input type="checkbox" id="check-destaque" onClick={props.onClick}/>
            <span className="lever"></span>
        </label>
        <label htmlFor="check-destaque">
            <h3 className="form-block-title">{props.title}</h3>
            <p className="check-description">{props.description}</p>
        </label>
    </div>
);

Toggle.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    onClick: PropTypes.func,
}
export default Toggle;
