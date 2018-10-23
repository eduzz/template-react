import React, { Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { IForm } from '../../..';
import Radio from '@react-form-fields/material-ui/components/Radio';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles(theme => ({
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  content: {
    display: 'flex',
  },
  optionControl: {
    marginRight: 32,
    width: 300,
    display: 'flex',
    flexDirection: 'column',
  },
  optionDescription: {
    marginLeft: 35,
  },
}))
export default class access_type extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <Fragment>
        <label className={classes.title}>
          Tipo de Acesso
        </label>
        <Grid container className={classes.content}>
          <Grid item className={classes.optionControl}>
            <FormControlLabel
              control={
                <Radio
                  value={1}
                  onChange={form.updateModel((model, v) => model.access_type = v)}
                  checked={form.model.access_type === 1}
                />
              }
              label='Pago'
            />
            <label className={classes.optionDescription}>
              Esse acesso tem <strong>integração com a Eduzz</strong> e os usuários precisam adquirir o curso.
            </label>
          </Grid>
          <Grid item className={classes.optionControl}>
            <FormControlLabel
              control={
                <Radio
                  value={2}
                  onChange={form.updateModel((model, v) => model.access_type = v)}
                  checked={form.model.access_type === 2}
                />
              }
              label='Gratuito Restrito'
            />
            <label className={classes.optionDescription}>
              Com o acesso restrito qualquer pessoa pode acessar o curso e <strong>é necessário o cadastro.</strong>
            </label>
          </Grid>
          <Grid item className={classes.optionControl}>
            <FormControlLabel
              control={
                <Radio
                  value={3}
                  onChange={form.updateModel((model, v) => model.access_type = v)}
                  checked={form.model.access_type === 3}
                />
              }
              label='Público'
            />
            <label className={classes.optionDescription}>
              Com o acesso público qualquer pessoa pode acessar o curso sem a necessidade de um cadastro.
            </label>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}