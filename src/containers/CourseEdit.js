import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCourse } from '../actions';
import { Tabs, Pane } from '../components/Tabs';
import CourseBasicInfo from '../components/CourseBasicInfo';
import CourseAdvanced from '../components/CourseAdvanced';
import CoursePersonalization from '../components/CoursePersonalization';

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
                            <Pane title='Informações Básicas' icon='paper'>
                                <CourseBasicInfo />
                            </Pane>
                            <Pane title='Configurações Avançadas' icon='paper'>
                                <CourseAdvanced />
                            </Pane>
                            <Pane title="Personalizações" icon='paper'>
                                <CoursePersonalization />
                            </Pane>
                            <Pane title="Upsells" icon='paper'>
                                <h1> Upsells </h1>
                            </Pane>
                            <Pane title="Avaliações" icon='paper'>
                                <h1> Avaliações </h1>
                            </Pane>
        				</Tabs>
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