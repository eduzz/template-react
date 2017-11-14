import React, { Component } from 'react';
import jquery from 'jquery';
import Section from './Section';
import MyOwnCoursesSelect from '../MyOwnCoursesSelect';

class CourseFilter extends Component {
    componentDidMount() {
        jquery('#filter-course').material_select();
    }

    render() {
        return (
           <Section active={ this.props.active } title='Curso'>
		    	 <div className='input-field'>
                    <MyOwnCoursesSelect />
                </div>
		    </Section>
        );
    }
}

export default CourseFilter;
