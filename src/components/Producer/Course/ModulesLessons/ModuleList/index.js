import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import ModuleCard from './ModuleCard';
import Loading from 'components/Loading';
import { Snackbar, Dialog, FlatButton } from 'material-ui';
import { v4 } from 'uuid';

class ModuleList extends Component {
    constructor() {
        super();

        this.state = {
            isUndoOpen: false,
            isDelConfirmOpen: false,
        };
    }

    componentDidMount() {
        if(this.props.courseID && this.props.courseID !== 'new') {
            this.props.getModules(this.props.courseID);
        }
    }

    render() {
        return (
            <div>
                <Loading active={!this.props.modules.length} />

                {this.props.modules.map((module, key) =>
                    <ModuleCard
                        key={module.id || v4()}
                        title={module.title}
                        lessons={module.lessons}
                        newModule={module.id}
                        onExpandChange={() => this.props.getModuleLessons(module.id, module.lessons || [])}
                        onSave={title => this.props.postModule(this.props.courseID, title, key)}
                        onEdit={title => {
                            this.props.editModulePersist({
                                ...module,
                                title,
                            }, key);
                        }}
                        onDelete={() => {
                            this.setState({
                                isDelConfirmOpen: true,
                                module,
                                index: key,
                            });
                        }}
                        onCancel={() => {
                            if(!module.id) {
                                this.props.removeModule(key);
                            }
                        }}
                    />
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

                <Dialog
                    actions={[
                        <FlatButton
                            label="Cancelar"
                            primary={true}
                            onClick={() => {
                                this.setState({
                                    isDelConfirmOpen: false,
                                });
                            }}
                        />,
                        <FlatButton
                            label="Excluir"
                            primary={false}
                            onClick={() => {
                                this.setState({
                                    isUndoOpen: true,
                                    isDelConfirmOpen: false,
                                });
                                this.props.deleteModule(this.state.module.id);
                            }}
                        />,
                    ]}
                    modal={false}
                    open={this.state.isDelConfirmOpen}
                >
                    Tem certeza que deseja excluir este Módulo?
                </Dialog>

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
    removeModule(index) {
        dispatch(actions.removeModule(index));
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
    },
    editModule(index) {
        dispatch(actions.editModule(index));
    },
    editModulePersist(module, index) {
        dispatch(actions.editModulePersist(module, index));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);
