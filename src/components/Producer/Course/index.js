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
import { Toggle } from 'material-ui';
import Loading from 'components/Loading';

class Course extends Component {
    constructor() {
        super();

        this.state = {};

        this.courseID = null;
    }

    componentWillUnmount() {
        this.props.cleanCourse();
    }

    componentDidMount() {
        if(this.courseID && this.courseID !== 'new') {
            this.props.getCourse(this.courseID);
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        this.props.saveCourse({
            ...this.props.course,
        });
    }

    render() {
        this.courseID = this.props.match.params.courseID;

        if(this.props.course.isDeleted) {
            this.props.cleanCourse();
            return <Redirect to='/producer' />;
        }

        return (
        	<form onSubmit={this.handleSubmit}>
        		<section className={styles.component}>
                    <div className='container'>

                        {this.courseID && this.courseID !== 'new' && <Loading active={!this.props.course.id} absolutePosition={true} />}

                        <div className="course-header row">
                            <div className='col s9'>
                                <Input
                                    floatlabel='Nome do Curso/Programa'
                                    className='bigger'
                                    defaultValue={this.props.course.title}
                                    async={this.courseID && this.courseID !== 'new'}
                                    onChange={this.props.changeCourseTitle}
                                    style={{width: '100%'}}
                                    required
                                />
                            </div>
                            <div className='col s3'>
                                <Toggle
                                    label='Publicado'
                                    toggled={this.props.course.published === '1'}
                                    onClick={() => this.props.changeCourseState(this.props.course.published === '1' ? '0' : '1')}
                                />
                            </div>
                        </div>
        				<Tabs>
                            <Pane title='Informações Básicas' icon='package'>
                                <BasicInfo courseID={this.courseID} />
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

                        <FloatButton />
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
    cleanCourse() {
        dispatch(actions.cleanCourse());
    },
    changeCourseTitle(e) {
        dispatch(actions.changeCourseTitle(e.target.value));
    },
    changeCourseState(value) {
        dispatch(actions.changeCourseState(value));
    },
    saveCourse(course) {
        if(course.id) {
            dispatch(actions.updateCourse(course));
        } else {
            dispatch(actions.createCourse(course));
        }
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
