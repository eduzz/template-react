import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import Collapsible, { Header, Content } from 'components/Collapsible';
import LessonCardList from './LessonCardList';
import { Button } from 'components/Modal';

class ModuleList extends Component {
    componentDidMount() {
        this.props.getModules(this.props.courseID);
    }

    render() {
        return (
            <div>
                {this.props.modules.map((module, key) =>
                    <Collapsible key={ key } className='card-lessons' id={`module-${module.id}`} options={{onOpen: () => this.props.getModuleLessons(module.id)}}>
                		<Header className='card-lessons-header'>
                			<h3 className='card-lessons-title'>{ module.title }</h3>
                			<div className='card-lessons-resume'>
                				<span>Duração do curso</span>
                				<span>Número de Aulas</span>
                			</div>
                		</Header>

                		<Content className='card-lessons-wrapper'>
                            <Button className='button affirmative waves-effect waves-light' target='modal-module-edit'>
                                <span>Editar Módulo</span>
                            </Button>

                            <Button className='button affirmative waves-effect waves-light' target='modal-lesson-edit'>
                                <span>Nova Aula</span>
                            </Button>

                            <Button className='button affirmative waves-effect waves-light' target='modal-lesson-import'>
                                <span>Importar Aulas</span>
                            </Button>

                            <LessonCardList lessons={ module.lessons || [] } />
                		</Content>
                	</Collapsible>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    modules: state.modules,
});

const mapDispatchToProps = dispatch => ({
    getModules(courseID) {
        dispatch(actions.getModules(courseID));
    },
    getModuleLessons(moduleID) {
        dispatch(actions.getModuleLessons(moduleID));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);
