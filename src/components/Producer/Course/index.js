import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import { Tabs, Pane } from 'components/Tabs';
import BasicInfo from './BasicInfo';
import Advanced from './Advanced';
import Personalization from './Personalization';
import Certificates from './Certificates';
import ModulesLessons from './ModulesLessons';
import styles from './styles.css';
import FloatButton from 'components/FloatButton';
import Input from 'components/Input';
import { Redirect } from 'react-router-dom';
import StateSelect from './StateSelect';

class Course extends Component {
    constructor() {
        super();

        this.courseID = null;
    }

    componentDidMount() {
        this.props.getCourse(this.courseID);
        this.props.getCourseCustomization(this.courseID);
    }

    render() {
        this.courseID = this.props.match.params.courseID;

        if(this.props.course.isDeleted) {
            this.props.cleanCourse();
            return <Redirect to='/producer' />;
        }

        return (
        	<form>
        		<section className={styles.component}>
        			<div className='container'>
                        <div className="course-header row">
                            <div className='col s9'>
                                <Input
                                    floatlabel='Nome do Curso/Programa'
                                    className='bigger'
                                    defaultValue={this.props.course.title}
                                    style={{width: '100%'}}
                                />
                            </div>
                            <div className='col s3'>
                                <StateSelect
                                    selected={this.props.course.published === undefined ? 0 : this.props.course.published ? 2 : 1}
                                    floatingLabelText='Estado do Curso'
                                />
                            </div>
                        </div>
        				<Tabs>
                            <Pane title='Informações Básicas' icon='package'>
                                <BasicInfo course={this.props.course} />
                            </Pane>
                            <Pane title='Módulos e Aulas' icon='paper'>
                                <ModulesLessons courseID={this.courseID} />
                            </Pane>
                            <Pane title='Configurações Avançadas' icon='gears'>
                                <Advanced course={this.props.course}/>
                            </Pane>
                            <Pane title="Personalizações" icon='color-pallete'>
                                <Personalization />
                            </Pane>
                            <Pane title="Certificados" icon='paper'>
                                <Certificates />
                            </Pane>
        				</Tabs>
                        <FloatButton/>

        			</div>
        		</section>
        	</form>
        );
    }
}

const mapStateToProps = state => ({
    course: state.course,
});

const mapDispatchToProps = dispatch => ({
    getCourse(courseID) {
        dispatch(actions.getCourse(courseID));
    },
    getCourseCustomization(courseID) {
        dispatch(actions.getCourseCustomization(courseID));
    },
    cleanCourse() {
        dispatch(actions.cleanCourse());
    },
    saveCourse() {
        dispatch(actions.updateCourse());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
