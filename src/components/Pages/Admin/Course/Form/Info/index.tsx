import React, { Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { CourseFormContext } from '../';

interface IProps {
  classes?: any;
  context?: any;
}

interface IState {
  title: string;
  description: string;
  isSelectorOpen: boolean;
}

@WithStyles(theme => ({
  titleLabel: {
    marginBottom: 8,
  },
  content: {
    display: 'flex',
  },
  publishedSwitch: {
    marginLeft: 8,
  },
}))
class Info extends React.PureComponent<IProps, IState> {
  render() {
    const { classes, context } = this.props;

    return (
      <Fragment>
        <FormControl fullWidth error={context.error && !context.title}>
          <label className={classes.titleLabel}>
            Título
          </label>
          <div className={classes.content}>
            <TextField
              value={context.title}
              name='title'
              onChange={context.handleChange}
              variant='outlined'
              fullWidth
              error={context.error && !context.title}
            />
            <FormControlLabel
              className={classes.publishedSwitch}
              control={
                <Switch
                  checked={context.published}
                  // onClick={this.handleToggle('published')}
                  color='secondary'
                />
              }
              label='Publicar'
            />
          </div>
          {context.error && !context.title && <FormHelperText className={classes.errorLabel}>Campo obrigatório</FormHelperText>}
        </FormControl>
      </Fragment>
    );
  }
}

export default React.forwardRef((props: IProps, ref) => (
  <CourseFormContext.Consumer>
    {context => <Info {...props} context={context} {...ref} />}
  </CourseFormContext.Consumer>
));