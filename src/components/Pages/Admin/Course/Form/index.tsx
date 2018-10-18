import React from 'react';
import Toolbar from 'components/Layout/Toolbar';
import Grid from '@material-ui/core/Grid';
import { WithStyles } from 'decorators/withStyles';
import Info from './Info';
import Content from './Content';
import Button from '@material-ui/core/Button';
import ContentSaveIcon from 'mdi-react/ContentSaveIcon';
import Tooltip from '@material-ui/core/Tooltip';
import { FormValidation } from '@react-form-fields/material-ui/components/FormValidation';
import { FormComponent, IStateForm } from 'components/Abstract/Form';

export interface IForm {
  model: Form['state']['model'];
  updateModel: Form['updateModel'];
}

interface IProps {
  classes?: any;
}

interface IState extends IStateForm<{
  title: string;
  published: boolean;
  category: string | number;
  description: string;
  accessType: number;
}> { }

@WithStyles(theme => ({
  container: {
    padding: 16,
  },
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
      ...this.state,
    };
  }

  handleSubmit = (isValid: boolean) => {

    if (!isValid) return;

    console.log(this.state);
  }

  handleChange = (label: string, value: any) => {
    this.setState({
      [label]: value,
    } as any);
  }

  render() {
    const { classes } = this.props;
    const form = {
      model: this.state.model,
      updateModel: this.updateModel,
    };

    return (
      <FormValidation onSubmit={this.handleSubmit}>
        <Toolbar title='Curso' />

        <Grid container>
          <Grid item xs={12}>
            <Info form={form} />
          </Grid>
          <Grid item xs={12}>
            <Content form={form} />
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