import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  classes?: any;
  onChange?: any;
}

interface IState {
  published: boolean;
  highlight: boolean;
}

@WithStyles(theme => ({
  button: {
    borderRadius: 4,
    backgroundColor: '#009358',
    height: 40,
    width: 120,
  },
}))
export default class Actions extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      published: true,
      highlight: false,
    };
  }

  handleToggle = (stateLabel: string) =>
    () => {
      const state = {
        [stateLabel]: !this.state[stateLabel],
      } as any;

      this.setState(state);

      this.props.onChange && this.props.onChange(state);
    }

  render() {
    const { classes } = this.props;
    const { highlight, published } = this.state;

    return (
      <Fragment>
        <FormControlLabel
          control={
            <Switch
              checked={highlight}
              onClick={this.handleToggle('highlight')}
              color='secondary'
            />
          }
          label='Destaque'
        />
        <FormControlLabel
          control={
            <Switch
              checked={published}
              onClick={this.handleToggle('published')}
              color='secondary'
            />
          }
          label='Publicar'
        />
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          type='submit'
        >
          Salvar
        </Button>
      </Fragment>
    );
  }
}