import React from 'react';
import { FormValidation } from '@react-form-fields/material-ui/components/FormValidation';
import Grid from '@material-ui/core/Grid';
import Toolbar from 'components/Layout/Toolbar';
import Button from '@material-ui/core/Button';
import ContentSaveIcon from 'mdi-react/ContentSaveIcon';
import { WithRouter } from 'decorators/withRouter';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import LessonType from './LessonType';
import Title from './Title';
import ShortDescription from './ShortDescription';
import Description from './Description';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

export interface IForm {
  model: Partial<IModel>;
  updateModel: (handler: (model: IModel, value: any) => void) => any;
}

export interface IModel {
  title: string;
  drm_active: boolean;
  content: {
    1: string;
    2: string;
    4: string;
    5: string;
  };
  lesson_type: {
    id: number;
  };
  short_description: string;
  description: string;
  description_type: 'Descricao' | 'Iframe';
  iframe_url: string;
  iframe_config: string;
}

interface IProps {
  classes?: any;
  match?: any;
}

interface IState extends IStateForm<IModel> { }

@WithRouter()
export default class Form extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      model: {
        title: '',
        drm_active: true,
        content: {
          1: '',
          2: '',
          4: '',
          5: '',
        },
        lesson_type: {
          id: 1,
        },
        short_description: '',
        description: '',
        description_type: 'Descricao',
      },
    };
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
  }

  render() {
    const { match: { params } } = this.props;
    const { model } = this.state;

    const form = {
      model,
      updateModel: this.updateModel,
    } as IForm;

    console.log(model);

    return (
      <FormValidation onSubmit={this.handleSubmit}>
        <Toolbar>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={true}>
              <Typography variant='h6' color='inherit' noWrap>
                {`${params.id ? 'Editar' : 'Nova'} Aula`}
              </Typography>
            </Grid>

            <Grid item xs={false}>
              <Button type='submit' color='secondary' variant='raised' disabled={false}>
                <ContentSaveIcon />
                <Hidden implementation='css' xsDown>Salvar</Hidden>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>

        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Title form={form} />
          </Grid>
          <Grid item xs={12}>
            <LessonType form={form} />
          </Grid>
          <Grid item xs={12}>
            <ShortDescription form={form} />
          </Grid>
          <Grid item xs={12}>
            <Description form={form} />
          </Grid>
        </Grid>
      </FormValidation>
    );
  }
}