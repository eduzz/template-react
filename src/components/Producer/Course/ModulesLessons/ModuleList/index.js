import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import LessonCardList from './LessonCardList';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Loading from 'components/Loading';
import Input from 'components/Input';

class ModuleList extends Component {
    componentDidMount() {
        this.props.getModules(this.props.courseID);
    }

    render() {
        return (
            <div>
                <Loading active={!this.props.modules.length} />

                {this.props.modules.map((module, key) =>
                    <Card
                        key={module.id}
                        onExpandChange={() => this.props.getModuleLessons(module.id, module.lessons || [])}
                        className='card-lessons'
                    >
                        <CardHeader
                            title={module.title || <Input placeholder='Nome do modulo'/>}
                            subtitle={
                                <div className='card-lessons-resume'>
                    				<span>Duração do curso</span>
                    				<span>Número de Aulas</span>
                    			</div>
                            }
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText className='card-lessons-wrapper' expandable={true}>
                            {/* <Button className='button affirmative waves-effect waves-light' target='modal-module-edit'>
                                <span>Editar Módulo</span>
                            </Button>

                            <Button className='button affirmative waves-effect waves-light' target='modal-lesson-edit'>
                                <span>Nova Aula</span>
                            </Button>

                            <Button className='button affirmative waves-effect waves-light' target='modal-lesson-import'>
                                <span>Importar Aulas</span>
                            </Button> */}

                            <LessonCardList lessons={ module.lessons || [] } />
                        </CardText>
                    </Card>
                )}

                <div className='row'>
                    <div className='col s12 center'>
                        <a
                            className='button affirmative waves-effect waves-light'
                            onClick={() => this.props.addModule()}
                        >
                            <span>Adicionar Módulo</span>
                        </a>
                    </div>
                </div>
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
    getModuleLessons(moduleID, lessons) {
        if(!lessons.length) {
            dispatch(actions.getModuleLessons(moduleID));
        }
    },
    addModule() {
        dispatch(actions.addModule());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);
