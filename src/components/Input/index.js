import React from 'react';
import { v4 } from 'uuid';

const Input = props => {
    const id = v4();

    return (
        <div className={`input-field ${props.className}`}>
            <label htmlFor={props.id || id} className={props.defaultValue || props.value ? 'active' : ''}>
                {props.floatlabel}
            </label>
            <input
                id={id}
                type='text'
                key={props.defaultValue ? 'notLoadedYet' : 'loaded'}
                {...props}
            />
        </div>
    );
};

export default Input;
