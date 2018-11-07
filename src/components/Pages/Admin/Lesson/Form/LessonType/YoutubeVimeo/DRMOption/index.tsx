import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@react-form-fields/material-ui/components/Switch';
import { IForm } from '../../../';
import Typography from '@material-ui/core/Typography';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles({
  root: {
    width: 300,
    display: 'flex',
    flexDirection: 'column',
  },
  switch: {
    margin: 0,
  },
  switchLabel: {
    marginLeft: -16,
  },
  caption: {
    marginLeft: 48,
  },
})
export default class DRMOption extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <div className={classes.root}>
        <FormControlLabel
          classes={{
            root: classes.switch,
            label: classes.switchLabel,
          }}
          control={
            <Switch
              onChange={form.updateModel((model, v) => model.drm_active = !model.drm_active)}
              checked={!form.model.drm_active}
            />
          }
          label='Ativar DRM'
        />
        <Typography className={classes.caption} variant='caption' color='inherit'>
          Exibe uma layer com o nome e o CPF do aluno durante a exibição do video.
        </Typography>
      </div>
    );
  }
}