import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModuleCard from './ModuleCard';
import Dialog, { DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Button from 'material-ui/Button';
import { v4 } from 'uuid';
import { fetchModules, cleanModules, fetchModuleLessons, addModule, postModule, editModulePersist, removeModule, deleteModule, deleteModulePersist, deleteModuleUndo } from 'actionCreators/modules';

const styles = require('./styles.css');

interface IProps {
  courseID: string | number;
  modules: Array<any>;
  fetchModules: any;
  cleanModules: any;
  fetchModuleLessons: any;
  addModule: any;
  postModule: any;
  editModulePersist: any;
  removeModule: any;
  deleteModule: any;
  deleteModulePersist: any;
  deleteModuleUndo: any;
  editable: boolean;
  placeholderLines?: number;
  type?: string;
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
      this.props.fetchModules(this.props.courseID);
    }
  }

  componentWillUnmount() {
    this.props.cleanModules();
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
      this.props.modules.length ? <div>
        {this.props.modules.map((module, key) => (
          <ModuleCard
            key={module.id || v4()}
            title={module.title}
            lessons={module.lessons}
            id={module.id}
            editable={this.props.editable}
            courseID={this.props.courseID}
            type={this.props.type}
            totalLessons={module.total_lessons}
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

        {this.props.editable && <div className='row'>
          <div className='col s12 center'>
            <a
              className='button affirmative waves-effect waves-light'
              onClick={() => this.props.addModule()}
            >
              <span>Adicionar Módulo</span>
            </a>
          </div>
        </div>}

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
        :
        <div className={styles.component}>
          <div className='loading'>
            {Array.apply(null, Array(this.props.placeholderLines)).map((e: any, index: number) =>
              <div key={index} className='block'>
                <div className='line'></div>
                <div className='line'></div>
              </div>
            )}
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  modules: state.modules
});

export default connect(mapStateToProps, {
  fetchModules,
  cleanModules,
  fetchModuleLessons,
  addModule,
  postModule,
  editModulePersist,
  removeModule,
  deleteModule,
  deleteModulePersist,
  deleteModuleUndo
})(ModuleList);