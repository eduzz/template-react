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
import Typography from '@material-ui/core/Typography';

export interface IForm {
  model: Partial<IModel>;
  updateModel: (handler: (model: IModel, value: any) => void) => any;
}

export interface IModel {
  title: string;
  drm_active: boolean;
  content: string;
  lesson_type: {
    id: number;
  };
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
}))
export default class Form extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      model: {
        title: '',
        drm_active: true,
        content: '',
        lesson_type: {
          id: 1,
        },
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

    console.log(model);

    return (
      <FormValidation onSubmit={this.handleSubmit}>
        <Toolbar title={params.id ? 'Editar Aula' : 'Nova Aula'} />

        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography variant='subtitle1' color='inherit' noWrap>Título</Typography>
            <FieldText
              value={model.title}
              name='title'
              validation='required'
              onChange={this.updateModel((model, v) => model.title = v)}
              margin='dense'
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