import Grid from '@material-ui/core/Grid';
import FieldSwitch from '@react-form-fields/material-ui/components/Switch';
import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

interface IProps {
  model: {
    highlight?: boolean;
    offer_shelf?: boolean;
  };
  onChange: (value: IProps['model']) => void;
}

interface IState {
  highlight: boolean;
  offer_shelf: boolean;
}

export default class Actions extends React.PureComponent<IProps, IState> {

  handleChange(model: IProps['model']) {
    this.props.onChange({ ...this.props.model, ...model });
  }

  handleChangeHighlight = (highlight: boolean) => this.handleChange({ highlight });
  handleChangeOfferShelf = (offer_shelf: boolean) => this.handleChange({ offer_shelf });

  render() {
    const { model } = this.props;

    return (
      <Fragment>
        <Typography variant='subtitle1'>Onde vamos exibir a oferta?</Typography>

        <Grid container spacing={16} alignItems='center'>

          <Grid item>
            <FieldSwitch
              label='Destaque'
              helperText='Anuncio na parte superior da tela'
              checked={model.highlight}
              onChange={this.handleChangeHighlight}
            />
          </Grid>

          <Grid item>
            <FieldSwitch
              label='Mostrar na Vitrine'
              helperText='Seção Conheça Também na vitrine'
              checked={model.offer_shelf}
              onChange={this.handleChangeOfferShelf}
            />
          </Grid>

        </Grid>
      </Fragment>
    );
  }
}