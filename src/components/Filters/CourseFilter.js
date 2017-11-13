import React, { Component } from 'react';
import jquery from 'jquery';
import Section from './Section';

class CourseFilter extends Component {
    componentDidMount() {
        jquery('#filter-course').material_select();
    }

    render() {
        return (
           <Section active={ this.props.active } title='Curso'>
		    	 <div className='input-field'>
                    <select id="filter-course">
                        <option value=''>Todos</option>
                        <option value='1'>Curso 1</option>
                        <option value='2'>Curso 2</option>
                        <option value='3'>Curso 3</option>
                    </select>
                </div>
		    </Section>
        );
    }
}

export default CourseFilter;
