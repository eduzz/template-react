import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import { FormValidation } from '@react-form-fields/material-ui/components/FormValidation';
import Grid from '@material-ui/core/Grid';
import Toolbar from 'components/Layout/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ContentSaveIcon from 'mdi-react/ContentSaveIcon';
import { WithRouter } from 'decorators/withRouter';
import { FieldText } from '@react-form-fields/material-ui';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import LessonType from './LessonType';

export interface IForm {
  model: Partial<IModel>;
  updateModel: (handler: (model: IModel, value: any) => void) => any;
}

export interface IModel {
  title: string;
}

interface IProps {
  classes?: any;
  match?: any;
}

interface IState extends IStateForm<IModel> { }

@WithRouter()
@WithStyles(theme => ({
  saveButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  titleField: {
    marginBottom: 16,
  },
}))
export default class Form extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      model: {
        title: '',
      },
    };
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
  }

  render() {
    const { classes, match: { params } } = this.props;
    const { model } = this.state;

    const form = {
      model,
      updateModel: this.updateModel,
    } as IForm;

    return (
      <FormValidation onSubmit={this.handleSubmit}>
        <Toolbar title={params.id ? 'Editar Aula' : 'Nova Aula'} />

        <Grid container>
          <Grid item xs={12}>
            <FieldText
              value={model.title}
              className={classes.titleField}
              name='title'
              validation='required'
              onChange={this.updateModel((model, v) => model.title = v)}
              margin='dense'
              label='Título'
              placeholder='Título da Aula'
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <LessonType form={form} />
          </Grid>
        </Grid>

        <Tooltip title='Salvar'>
          <Button
            className={classes.saveButton}
            type='submit'
            color='secondary'
            variant='fab'
          >
            <ContentSaveIcon />
          </Button>
        </Tooltip>
      </FormValidation>
    );
  }
}