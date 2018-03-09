import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ModuleCard from './ModuleCard';
import Loading from 'components/Loading';
import { Snackbar, Dialog, FlatButton } from 'material-ui';
import { v4 } from 'uuid';
import {
  getModules,
  getModuleLessons,
  addModule,
  removeModule,
  postModule,
  deleteModule,
  deleteModulePersist,
  deleteModuleUndo,
  editModulePersist
} from 'actionCreators/modules';

interface IProps {
  courseID: string | number;
  modules: Array<any>;
  getModules: any;
  removeModule: any;
  addModule: any;
  deleteModule: any;
  deleteModuleUndo: any;
  deleteModulePersist: any;
  getModuleLessons: any;
  postModule: any;
  editModulePersist: any;
}

interface IState {
  module: any;
  isDelConfirmOpen: boolean;
  isUndoOpen: boolean;
  index: number;
}

class ModuleList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isUndoOpen: false,
      isDelConfirmOpen: false,
      module: {},
      index: null,
    };
  }

  componentDidMount() {
    if (this.props.courseID && this.props.courseID !== 'new') {
      this.props.getModules(this.props.courseID);
    }
  }

  render() {
    return (
      <div>
        <Loading active={!this.props.modules.length} />

        {this.props.modules.map((module, key) => (
          <ModuleCard
            key={module.id || v4()}
            title={module.title}
            lessons={module.lessons}
            newModule={module.id}
            onExpandChange={() => {
              if (!module.lessons.length) {
                this.props.getModuleLessons(module.id);
              }
            }}
            onSave={(title: string) =>
              this.props.postModule(this.props.courseID, title, key)
            }
            onEdit={(title: string) => {
              this.props.editModulePersist(
                {
                  ...module,
                  title
                },
                key
              );
            }}
            onDelete={() => {
              this.setState({
                isDelConfirmOpen: true,
                module,
                index: key
              });
            }}
            onCancel={() => {
              if (!module.id) {
                this.props.removeModule(key);
              }
            }}
          />
        ))}

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
              label='Cancelar'
              primary={true}
              onClick={() => {
                this.setState({
                  isDelConfirmOpen: false
                });
              }}
            />,
            <FlatButton
              label='Excluir'
              primary={false}
              onClick={() => {
                this.setState({
                  isUndoOpen: true,
                  isDelConfirmOpen: false
                });
                this.props.deleteModule(this.state.module.id);
              }}
            />
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
                  isUndoOpen: false
                });
                this.props.deleteModuleUndo(
                  this.state.module,
                  this.state.index
                );
              }}
            >
              UNDO
            </span>
          }
          onRequestClose={() => {
            this.setState({
              isUndoOpen: false
            });
            this.props.deleteModulePersist(this.state.module.id);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  modules: state.modules
});

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({
    getModules,
    getModuleLessons,
    addModule,
    removeModule,
    postModule,
    deleteModule,
    deleteModulePersist,
    deleteModuleUndo,
    editModulePersist
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);