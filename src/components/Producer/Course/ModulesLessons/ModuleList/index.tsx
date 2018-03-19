import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ModuleCard from './ModuleCard';
import Loading from 'components/Loading';
import Dialog, { DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Button from 'material-ui/Button';
import { v4 } from 'uuid';
import { fetchModules, fetchModuleLessons, addModule, postModule, editModulePersist, removeModule, deleteModule, deleteModulePersist, deleteModuleUndo } from 'actionCreators/modules';

interface IProps {
  courseID: string | number;
  modules: Array<any>;
  fetchModules: any;
  fetchModuleLessons: any;
  addModule: any;
  postModule: any;
  editModulePersist: any;
  removeModule: any;
  deleteModule: any;
  deleteModulePersist: any;
  deleteModuleUndo: any;
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
    if (this.props.courseID && this.props.courseID !== 'new' && !this.props.modules.length) {
      this.props.fetchModules(this.props.courseID);
    }
  }

  handleSnackbarClose = () => {
    this.setState({
      isUndoOpen: false
    });

    this.props.deleteModulePersist(this.state.module.id);
  }

  handleSnackbarUndo = () => {
    this.setState({
      isUndoOpen: false
    });
    this.props.deleteModuleUndo(
      this.state.module,
      this.state.index
    );
  }

  handleDeleteCancel = () => {
    this.setState({
      isDelConfirmOpen: false
    });
  }

  handleDeleteConfirm = () => {
    this.setState({
      isUndoOpen: true,
      isDelConfirmOpen: false
    });

    this.props.deleteModule(this.state.module.id);
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
              if (!module.lessons || (module.lessons && !module.lessons.length)) {
                this.props.fetchModuleLessons(module.id);
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

        {/* <Dialog
          actions={[
            <Button
              color='primary'
              onClick={() => {
                this.setState({
                  isDelConfirmOpen: false
                });
              }}
            >
              Cancelar
            </Button>,
            <Button
              onClick={() => {
                this.setState({
                  isUndoOpen: true,
                  isDelConfirmOpen: false
                });
                this.props.deleteModule(this.state.module.id);
              }}
            >
              Excluir
            </Button>
          ]}
          modal={false}
          open={this.state.isDelConfirmOpen}
        >
          Tem certeza que deseja excluir este Módulo?
        </Dialog> */}

        <Dialog
          open={this.state.isDelConfirmOpen}
          keepMounted
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja excluir este Módulo?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteCancel} color='primary'>
              Cancelar
            </Button>
            <Button onClick={this.handleDeleteConfirm} color='secondary'>
              Excluir
            </Button>
          </DialogActions>
        </Dialog>

        {/* <Snackbar
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
        /> */}

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.isUndoOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          message={<span>Módulo Excluido</span>}
          action={[
            <Button key='undo' color='secondary' size='small' onClick={this.handleSnackbarUndo}>
              UNDO
            </Button>,
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  modules: state.modules
});

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({ fetchModules, fetchModuleLessons, addModule, postModule, editModulePersist, removeModule, deleteModule, deleteModulePersist, deleteModuleUndo }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);