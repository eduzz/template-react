
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCourse } from '../actions';
import Icon from '../components/Icon';
import Tabs, { Pane } from '../components/Tabs';
import CourseBasicInfo from '../components/CourseBasicInfo';

class CourseEdit extends Component {
    componentDidMount() {
        const courseID = 1; // mock

        this.props.dispatch(getCourse(courseID));
    }

    render() {
        return (
        	<form>
        		<section className='page-content page-course'>
        			<div className='container'>
        				<div className='input-field bigger'>
        					<input id='course-name' type='text' />
        					<label htmlFor='course-name'>Nome do Curso/Programa</label>
        				</div>

        				<Tabs>
                            <Pane id='pana1' title="Test 7" icon='paper'>
                                <h1>TEST DO K7</h1>
                            </Pane>
                            <Pane id='pana2' title="Test 8" icon='paper'>
                                <h1>TEST DO K8</h1>
                            </Pane>
        				</Tabs>

                        <CourseBasicInfo />
        			</div>
        		</section>
        	</form>
        );
    }
}

const mapStateToProps = state => ({
    course: state.course,
});

export default connect(mapStateToProps)(CourseEdit);
