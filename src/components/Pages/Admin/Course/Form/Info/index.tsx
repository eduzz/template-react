import React, { Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { IForm } from '../';
import Switch from '@react-form-fields/material-ui/components/Switch';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles({
  titleLabel: {
    marginBottom: 8,
  },
  content: {
    display: 'flex',
  },
  publishedSwitch: {
    marginLeft: 8,
  },
  switchLabel: {
    marginLeft: -16,
  },
})
export default class Info extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <Fragment>
        <label className={classes.titleLabel}>
          Título
          </label>
        <div className={classes.content}>
          <FieldText
            value={form.model.title}
            name='title'
            validation='required'
            onChange={form.updateModel((model, v) => model.title = v)}
            margin='dense'
          />
          <FormControlLabel
            className={classes.publishedSwitch}
            classes={{
              label: classes.switchLabel,
            }}
            control={
              <Switch
                checked={form.model.published}
                onChange={form.updateModel((model, v) => model.published = v)}
              />
            }
            label='Publicar'
          />
        </div>
      </Fragment>
    );
  }
}