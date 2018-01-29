import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import LessonCardList from './LessonCardList';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Loading from 'components/Loading';
import Input from 'components/Input';
import loadingGif from 'assets/img/loading.gif';
import { Snackbar } from 'material-ui';

class SaveButton extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
        };
    }

    render() {
        let element = (
            <a
                onClick={(e) => {
                    e.preventDefault();

                    this.props.onClick();

                    this.setState({isLoading: true});
                }}
                style={{
                    cursor: 'pointer',
                }}
            >
                Salvar
            </a>
        );

        if(this.state.isLoading) {
            element = <img
                src={loadingGif}
                alt=''
                style={{
                    width: '30px',
                    position: 'absolute',
                    marginTop: '-10px',
                }}
            />;
        }

        return element;
    }
}

class ModuleList extends Component {
    constructor() {
        super();

        this.state = {
            isUndoOpen: false,
        };
    }

    componentDidMount() {
        this.props.getModules(this.props.courseID);
    }

    render() {
        return (
            <div>
                <Loading active={!this.props.modules.length} />

                {this.props.modules.map((module, key) =>
                    <Card
                        key={key}
                        onExpandChange={() => this.props.getModuleLessons(module.id, module.lessons || [])}
                        className='card-lessons'
                    >
                        <CardHeader
                            title={module.title ||
                                <Input
                                    floatlabel='Nome do módulo'
                                    onChange={(e) => {
                                        this.setState({
                                            [key]: e.target.value,
                                        });
                                    }}
                                    style={{
                                        width: '300px',
                                    }}
                                />
                            }
                            subtitle={
                                <div className='card-lessons-resume'>
                    				<span>Duração do curso</span>
                    				<span>Número de Aulas</span>
                                    <span>
                                        {module.title ?
                                            <a onClick={() => {
                                                this.setState({
                                                    isUndoOpen: true,
                                                    module,
                                                    index: key,
                                                });
                                                this.props.deleteModule(module.id);
                                            }} style={{cursor: 'pointer'}}> Excluir </a> :
                                                <SaveButton onClick={() =>
                                                    this.props.postModule(this.props.courseID, this.state[key], key)}
                                                />
                                        }
                                    </span>
                    			</div>
                            }
                            actAsExpander={false}
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

                <Snackbar
                    open={this.state.isUndoOpen}
                    message='Módulo Excluido'
                    autoHideDuration={3000}
                    action={
                        <span
                            onClick={() => {
                                this.setState({
                                    isUndoOpen: false,
                                });
                                this.props.deleteModuleUndo(this.state.module, this.state.index);
                            }}
                        >
                            UNDO
                        </span>
                    }
                    onRequestClose={() => {
                        this.setState({
                            isUndoOpen: false,
                        });
                        this.props.deleteModulePersist(this.state.module.id);
                    }}
                />
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
    postModule(courseID, title, sequence) {
        dispatch(actions.postModule(courseID, title, sequence));
    },
    deleteModule(moduleID) {
        dispatch(actions.deleteModule(moduleID));
    },
    deleteModulePersist(moduleID) {
        dispatch(actions.deleteModulePersist(moduleID));
    },
    deleteModuleUndo(module, index) {
        dispatch(actions.deleteModuleUndo(module, index));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);
