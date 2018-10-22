import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { WithStyles } from 'decorators/withStyles';
import React, { Fragment } from 'react';

interface IProps {
  classes?: any;
  onChange?: any;
  published?: boolean;
  highlight?: boolean;
  offer_shelf?: boolean;
}

interface IState {
  published: boolean;
  highlight: boolean;
  offer_shelf: boolean;
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
  handleToggle = (stateLabel: string) =>
    () => {
      const props = {
        ...this.props,
        [stateLabel]: !this.props[stateLabel],
      } as any;

      this.setState(props);

      this.props.onChange && this.props.onChange(props);
    }

  render() {
    const { classes, highlight, offer_shelf, published } = this.props;

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
              checked={offer_shelf}
              onClick={this.handleToggle('offer_shelf')}
              color='secondary'
            />
          }
          label='Mostrar na Vitrine'
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