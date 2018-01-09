import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import { Tabs, Pane } from 'components/Tabs';
import BasicInfo from './BasicInfo';
import Advanced from './Advanced';
import Personalization from './Personalization';
import Certificates from './Certificates';
import Marketing from './Marketing';
import styles from './styles.css';
import FloatButton from 'components/FloatButton';
import Input from 'components/Input';

class Course extends Component {
    componentDidMount() {
        const courseID = this.props.match.params.courseID;

        this.props.getCourse(courseID);
    }

    render() {
        return (
        	<form>
        		<section className={styles.component}>
        			<div className='container'>
                        <div className="course-header">
                            <div className='input-field bigger'>
                                <Input
                                    floatlabel='Nome do Curso/Programa'
                                    defaultValue={this.props.course.title}
                                />
                            </div>
                            <div>
                                <div className='input-field bigger'>
                                    <Input
                                        floatlabel='Status do Curso'
                                        defaultValue='Publicado'
                                    />
                                </div>
                            </div>
                        </div>
        				<Tabs>
                            <Pane title='Informações Básicas' icon='package'>
                                <BasicInfo />
                            </Pane>
                            <Pane title='Configurações Avançadas' icon='gears'>
                                <Advanced />
                            </Pane>
                            <Pane title="Personalizações" icon='color-pallete'>
                                <Personalization />
                            </Pane>
                            <Pane title="Marketing" icon='chat-rounded'>
                                <Marketing />
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
