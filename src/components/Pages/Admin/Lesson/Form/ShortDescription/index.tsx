import Typography from '@material-ui/core/Typography';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { WithStyles } from 'decorators/withStyles';
import React, { Fragment, PureComponent } from 'react';

import { IForm } from '..';

interface IProps {
  form: IForm;
  classes?: any;
}

@WithStyles({
  fieldText: {
    marginTop: 8,
  },
})
export default class Title extends PureComponent<IProps> {
  render() {
    const { form, classes } = this.props;

    return (
      <Fragment>
        <Typography variant='subtitle1' color='inherit' noWrap>Descrição Curta</Typography>
        <FieldText
          value={form.model.shortdescription}
          name='shortdescription'
          onChange={form.updateModel((model, v) => model.shortdescription = v)}
          variant='outlined'
          helperText={`Digitados ${form.model.shortdescription.length} de 150`}
          fullWidth
          multiline
          rows={3}
          rowsMax={150}
          classes={{
            root: classes.fieldText,
          }}
          InputProps={{
            style: {
              backgroundColor: '#fff',
            },
          }}
          inputProps={{
            maxLength: 150,
          }}
          FormHelperTextProps={{
            style: {
              marginLeft: 0,
            },
          }}
        />
      </Fragment>
    );
  }
}