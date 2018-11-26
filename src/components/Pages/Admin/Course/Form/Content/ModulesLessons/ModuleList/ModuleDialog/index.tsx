import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { FieldText } from '@react-form-fields/material-ui';
import { WithStyles } from 'decorators/withStyles';
import Button from '@material-ui/core/Button';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Grid from '@material-ui/core/Grid';
import FreeModule from './FreeModule';
import HiddenModule from './HiddenModule';
import ModuleValidity from './ModuleValidity';
import Divider from '@material-ui/core/Divider';
import ModuleScheduling from './ModuleScheduling';
import { format } from 'date-fns';
import ReleaseAt from './ReleaseAt';
import moduleService from 'services/module';
import rxjsOperators from 'rxjs-operators';
import { IModule } from 'interfaces/models/module';

export interface IModel {
  name: string;
  free_module: boolean;
  hidden_module: boolean;
  module_validity: number;
  module_scheduling: number;
  release_at: string;
}

export interface IForm {
  model: IModel;
  updateModel: (handler: (model: IModel, value: any) => void) => any;
}

interface IProps {
  classes?: any;
}

interface IState extends IStateForm<IModel> {
  open: boolean;
  moduleId: number;
}

@WithStyles({
  titleLabel: {
    marginBottom: 8,
  },
  content: {
    display: 'flex',
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  optionControl: {
    marginRight: 16,
  },
  divider: {
    margin: '32px 0 24px 0',
  },
  textField: {
    marginBottom: 16,
  },
})
export default class ModuleDialog extends FormComponent<IProps, IState> {
  private initialModel: IModel = {
    name: '',
    free_module: false,
    hidden_module: false,
    module_validity: null,
    module_scheduling: null,
    release_at: format(new Date(), 'yyyy-MM-dd'),
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
      moduleId: null,
      model: {
        ...this.initialModel,
      },
    };
  }

  componentDidMount() {
    moduleService.getModuleInfo().pipe(
      rxjsOperators.bindComponent(this),
      rxjsOperators.logError(),
    ).subscribe((module = this.initialModel as IModule) => {
      this.setState({
        open: true,
        model: {
          ...module,
        },
      });
    });
  }

  private handleClose = () => {
    this.setState({
      open: false,
      moduleId: null,
    });
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    const { model } = this.state;

    const form = {
      model,
      updateModel: this.updateModel,
    } as IForm;

    return (
      <FormValidation onSubmit={this.handleSubmit}>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          fullWidth
        >
          <DialogTitle>
            Configurações do Módulo
          </DialogTitle>
          <DialogContent>
            <label className={classes.titleLabel}>
              Título
            </label>
            <FieldText
              value={model.name}
              className={classes.textField}
              name='name'
              validation='required'
              onChange={this.updateModel((model, v) => model.name = v)}
              margin='dense'
              placeholder='Título do Módulo'
            />

            <Grid container className={classes.content}>
              <Grid item className={classes.optionControl}>
                <FreeModule form={form} />
              </Grid>
              <Grid item className={classes.optionControl}>
                <HiddenModule form={form} />
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container className={classes.content}>
              <Grid item className={classes.optionControl}>
                <ModuleValidity form={form} />
              </Grid>
              <Grid item className={classes.optionControl}>
                <ModuleScheduling form={form} />
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container className={classes.content}>
              <Grid item className={classes.optionControl}>
                <ReleaseAt form={form} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancelar
            </Button>
            <Button type='submit' color='primary'>
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </FormValidation>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}