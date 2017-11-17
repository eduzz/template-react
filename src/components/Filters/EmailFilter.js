import React, { Component } from 'react';
import Section from './Section';

export default class EmailFilter extends Component {

    render() {
        return (
           <Section active={ this.props.active } title='E-mail'>
		        <div className='input-field'>
		            <input id='filter-email' type='text' placeholder='Informe o E-mail ou parte dele' />
		        </div>
		    </Section>
        );
    }
}