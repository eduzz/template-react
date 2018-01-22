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
import jquery from 'jquery';

class Course extends Component {
    constructor() {
        super();

        this.courseID = null;
    }

    componentDidMount() {
        this.props.getCourse(this.courseID);
    }

    render() {
        this.courseID = this.props.match.params.courseID;

        return (
        	<form>
        		<section className={styles.component}>
        			<div className='container'>
                        <div className="course-header">
                            <Input
                                className='bigger'
                                floatlabel='Nome do Curso/Programa'
                                defaultValue={this.props.course.title}
                            />
                            <div>
                                <Input
                                    className='bigger'
                                    floatlabel='Status do Curso'
                                    defaultValue='Publicado'
                                />
                            </div>
                        </div>
        				<Tabs>
                            <Pane title='Informações Básicas' icon='package'>
                                <BasicInfo course={this.props.course} />
                            </Pane>
                            <Pane title='Modulos e Aulas' icon='paper'>
                                <ModulesLessons courseID={this.courseID} />
                            </Pane>
                            <Pane title='Configurações Avançadas' icon='gears'>
                                <Advanced />
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
    getCourse: courseId => dispatch(actions.getCourse(courseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
