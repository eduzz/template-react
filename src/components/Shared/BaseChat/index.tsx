import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import { FieldText } from '@react-form-fields/material-ui';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  classes?: any;
  title: string;
  SwitchProps?: any;
  FieldTextProps?: any;
  options?: JSX.Element;
}

@WithStyles({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 8,
  },
  fieldText: {
    flexGrow: 1,
  },
  switch: {
    marginLeft: -16,
  },
})
export default class BaseChat extends PureComponent<IProps> {
  render() {
    const { classes, title, SwitchProps, FieldTextProps, options } = this.props;

    return (
      <Grid container>
        <Grid item xs={12} direction='row'>
          <Typography variant='subtitle2' color='inherit'>{title} {options}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.content}>
          <Switch
            {...SwitchProps}
            classes={{
              root: classes.switch,
              ...SwitchProps.classes,
            }}
          />
          <FieldText
            margin='dense'
            className={classes.fieldText}
            disabled={!SwitchProps.checked}
            {...FieldTextProps}
          />
        </Grid>
      </Grid>
    );
  }
}