import React, { Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import Grid from '@material-ui/core/Grid';

import { IForm } from 'components/Pages/Admin/Course/Form';
import { FieldText } from '@react-form-fields/material-ui';

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
    marginTop: 8,
    display: 'flex',
  },
}))
export default class Description extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <Fragment>
        <label className={classes.title}>
          Descrição
        </label>
        <Grid container className={classes.content}>
          <Grid xs={12} item>
            <FieldText
              value={form.model.description}
              name='description'
              placeholder='130 Caracteres'
              onChange={form.updateModel((model, v) => model.description = v)}
              variant='outlined'
              validation='required'
              fullWidth
              multiline
              rows={4}
              inputProps={{
                maxLength: 130,
              }}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}