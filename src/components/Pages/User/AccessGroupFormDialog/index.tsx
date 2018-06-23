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
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import ErrorMessage from 'components/ErrorMessage';
import Snackbar from 'components/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import { IAccessGroup } from 'interfaces/accessGroup';
import { FieldText, ValidationContext } from 'material-ui-form-fields';
import React, { Fragment } from 'react';
import rxjsOperators from 'rxjs-operators';
import accessGroupService from 'services/accessGroup';

interface IState extends IStateForm<{
  name: string;
  modules: IAccessGroup['modules'];
}> {
  loading: boolean;
  error?: any;
}

interface IProps {
  opened: boolean;
  onComplete: () => void;
  onCancel: () => void;
  classes?: any;
  model?: IAccessGroup;
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
export default class AccessGroupFormDialog extends FormComponent<IProps, IState> {
  handleEnter = () => {
    this.setState({ model: this.props.model || {} }, () => {
      this.loadData();
    });
  }

  loadData = () => {
    this.setState({ loading: true });

    accessGroupService.listModules().pipe(
      rxjsOperators.cache('access-group-form-modules'),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(modules => {
      const { model } = this.state;

      this.setState({
        model: {
          ...model,
          modules: modules.map(m => {
            return {
              ...m,
              ...(model.modules.find(c => c.id === m.id) || {})
            };
          })
        },
        loading: false
      });
    }, error => {
      this.setState({ error, loading: false });
    });
  }

  onSubmit = (event: Event) => {
    event.preventDefault();

    const { model } = this.state;
    const { onComplete } = this.props;

    if (!this.isFormValid()) return;

    accessGroupService.save(model as IAccessGroup).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      Snackbar.show('Grupo de acesso salvo');
      this.setState({ loading: false });

      onComplete();
    }, err => {
      Snackbar.error(err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { model, loading, error } = this.state;
    const { opened, classes, onCancel } = this.props;

    return (
      <Dialog
        open={opened}
        disableBackdropClick
        disableEscapeKeyDown
        onEnter={this.handleEnter}
        onExited={this.resetForm}
        TransitionComponent={Transition}>

        {loading && <LinearProgress color='secondary' />}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <ValidationContext ref={this.bindValidationContext.bind(this)}>
            <DialogTitle>Grupo de Acesso</DialogTitle>
            <DialogContent className={classes.content}>
              {error &&
                <ErrorMessage error={error} tryAgain={this.loadData.bind(this)} />
              }

              {!error &&
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
                          <td>
                            <Typography>{module.name}</Typography>
                          </td>
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
              <Button onClick={onCancel}>
                Cancelar
            </Button>
              <Button color='secondary' type='submit' disabled={loading || !!error}>
                Salvar
            </Button>
            </DialogActions>
          </ValidationContext>
        </form>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}