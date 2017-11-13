import React, { Component } from 'react';
import Section from './Section';

class StudentFilter extends Component {

    render() {
        return (
           <Section active={ this.props.active } title='Aluno'>
		        <div className='input-field'>
		            <input id='filter-student-name' type='text' placeholder='Nome ou E-mail do Aluno' />
		        </div>
		    </Section>
        );
    }
}

export default StudentFilter;