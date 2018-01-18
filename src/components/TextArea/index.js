import React from 'react';
import { v4 } from 'uuid';

const TextArea = props => {
    const id = v4();

    return (
        <div>
            <label htmlFor={props.id || id} className={props.defaultValue || props.value ? 'active' : ''}>
                {props.floatlabel}
            </label>
            <textarea
                id={id}
                type='text'
                className='materialize-textarea'
                key={props.defaultValue ? 'notLoadedYet' : 'loaded'}
                {...props}
            />
        </div>
    );
};

export default TextArea;
