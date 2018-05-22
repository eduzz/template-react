import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Slide,
  Typography,
} from '@material-ui/core';
import ErrorMessage from 'components/ErrorMessage';
import { FieldText, FieldValidation } from 'components/Field';
import { FormComponent, IStateForm } from 'components/FormComponent';
import Snackbar from 'components/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import { IAccessGroup } from 'interfaces/accessGroup';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import {
  cancelAccessGroupFormModal,
  cleanAccessGroupSaveError,
  requestAccessGroupSave,
} from 'store/actionCreators/accessGroup';
import { cleanAccessGroupModuleListError, requestAccessGroupModuleList } from 'store/actionCreators/accessGroupModule';
import { cleanCourseListError, requestCourseList } from 'store/actionCreators/course';

interface IState extends IStateForm<{
  name: string;
  modules: IAccessGroup['modules'];
}> { }

interface IPropsFromConnect {
  opened: boolean;
  loading: boolean;
  model: IAccessGroup;
  modules: IAccessGroup['modules'];
  classes?: any;
  loadingError?: any;
  saveError?: any;
  requestAccessGroupModuleList?: typeof requestAccessGroupModuleList;
  cleanAccessGroupModuleListError?: typeof cleanAccessGroupModuleListError;
  cancelAccessGroupFormModal?: typeof cancelAccessGroupFormModal;
  requestAccessGroupSave?: typeof requestAccessGroupSave;
  cleanAccessGroupSaveError?: typeof cleanAccessGroupSaveError;
}

@WithStyles(theme => ({
  content: {
    width: 500,
    maxWidth: 'calc(95vw - 50px)'
  },
  table: {
    width: '100%',
    marginTop: 40,
    borderSpacing: 0
  },
  tableTh: {
    textAlign: 'left',
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'normal',
    fontSize: 13,
    textTransform: 'uppercase',
    opacity: 0.8,
    borderBottom: '1px solid ' + theme.palette.divider,
    paddingBottom: 15
  },
  tableThSwitch: {
    width: 62,
    textAlign: 'center'
  }
}))
class AccessGroupFormModal extends FormComponent<IPropsFromConnect, IState> {
  static getDerivedStateFromProps(nextProps: IPropsFromConnect, currentState: IState): IState {
    if (nextProps.opened && !nextProps.loadingError) {
      if (!nextProps.modules.length) nextProps.requestAccessGroupModuleList();
    }

    if (!nextProps.opened) {
      return {
        ...currentState,
        model: {}
      };
    }

    return {
      ...currentState,
      model: {
        name: nextProps.model.name,
        ...currentState.model,
        modules: [
          ...nextProps.modules.filter(m => (currentState.model.modules || []).every(cm => cm.id !== m.id)),
          ...(currentState.model.modules || [])
        ].filter(m => !!m)
      }
    };
  }

  onCancel() {
    this.props.cancelAccessGroupFormModal();
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    const { model } = this.state;
    const { requestAccessGroupSave } = this.props;

    const isValid = await this.isFormValid();
    if (!isValid) return;

    requestAccessGroupSave(model as any);
  }

  tryLoad() {
    const { loading, modules, requestAccessGroupModuleList } = this.props;
    if (loading) true;

    if (!modules.length) requestAccessGroupModuleList();
  }

  resetState() {
    const { cleanAccessGroupModuleListError } = this.props;

    cleanAccessGroupModuleListError();

    this.resetForm();
  }

  render() {
    const { model } = this.state;
    const { opened, loading, classes, saveError, loadingError, cleanAccessGroupSaveError } = this.props;

    return (
      <Dialog
        open={opened}
        disableBackdropClick
        disableEscapeKeyDown
        onExited={this.resetState.bind(this)}
        TransitionComponent={Transition}>

        <Snackbar opened={!!saveError} error={saveError} onClose={() => cleanAccessGroupSaveError()} />

        {loading && <LinearProgress color='secondary' />}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <FieldValidation.Provider value={this.registerFields}>
            <DialogTitle>Grupo de Acesso</DialogTitle>
            <DialogContent className={classes.content}>
              {loadingError &&
                <ErrorMessage error={loadingError} tryAgain={this.tryLoad.bind(this)} />
              }

              {!loadingError &&
                <Fragment>
                  <FieldText
                    label='Nome'
                    disabled={loading}
                    value={model.name}
                    validation='required'
                    onChange={this.updateModel((model, v) => model.name = v)}
                    margin='none'
                  />

                  <table className={classes.table}>
                    <thead>
                      <tr>
                        <th className={classes.tableTh}>Ações</th>
                        <th className={`${classes.tableTh} ${classes.tableThSwitch}`}>Exibir</th>
                        <th className={`${classes.tableTh} ${classes.tableThSwitch}`}>Criar</th>
                        <th className={`${classes.tableTh} ${classes.tableThSwitch}`}>Editar</th>
                        <th className={`${classes.tableTh} ${classes.tableThSwitch}`}>Excluir</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(model.modules || []).map(module =>
                        <tr key={module.id}>
                          <td><Typography>{module.name}</Typography></td>
                          <td>
                            <Checkbox
                              checked={module.view || false}
                              onChange={this.updateModel((model, v) => module.view = v)}
                            />
                          </td>
                          <td>
                            <Checkbox
                              checked={module.create || false}
                              onChange={this.updateModel((model, v) => module.create = v)}
                            />
                          </td>
                          <td>
                            <Checkbox
                              checked={module.edit || false}
                              onChange={this.updateModel((model, v) => module.edit = v)}
                            />
                          </td>
                          <td>
                            <Checkbox
                              checked={module.delete || false}
                              onChange={this.updateModel((model, v) => module.delete = v)}
                            />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                </Fragment>
              }
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onCancel.bind(this)}>
                Cancelar
            </Button>
              <Button color='secondary' type='submit' disabled={loading || !!loadingError}>
                Salvar
            </Button>
            </DialogActions>
          </FieldValidation.Provider>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}) => {
  const model = state.accessGroup.formModel || {} as IAccessGroup;

  return {
    model,
    opened: state.accessGroup.isFormOpened,
    loading: state.accessGroupModule.isFetching || state.accessGroup.isSaving,
    loadingError: state.accessGroupModule.error,
    saveError: state.accessGroup.saveError,
    modules: state.accessGroupModule.modules.map(module => {

      return {
        ...module,
        ...((model.modules || []).find(m => m.id === module.id) || {})
      };
    })
  };
};

export default connect<IPropsFromConnect, {}, {}>(mapStateToProps, {
  cancelAccessGroupFormModal,
  requestCourseList,
  requestAccessGroupModuleList,
  cleanCourseListError,
  cleanAccessGroupModuleListError,
  requestAccessGroupSave,
  cleanAccessGroupSaveError
})(AccessGroupFormModal);

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}