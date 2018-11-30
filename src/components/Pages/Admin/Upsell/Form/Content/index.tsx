import React, { SyntheticEvent } from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { WithStyles } from 'decorators/withStyles';
import Product from './Product';
import ProductType from './ProductType';
import { UpsellFormContext, IUpsellFormContext } from '../Context';
import Fade from '@material-ui/core/Fade';
import Informations from './Informations';
import SelectedProduct from './SelectedProduct';

interface IProps {
  classes?: any;
  theme?: any;
}

interface IState {
  value: number;
}

@WithStyles(theme => ({
  root: {
    backgroundColor: '#fff',
  },
}), { withTheme: true })
export default class Content extends React.Component<IProps, IState> {
  static contextType = UpsellFormContext;
  context: IUpsellFormContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  handleChange = (event: SyntheticEvent, value: number) => {
    this.setState({ value });
  }

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  }

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
    const { model } = this.context;

    return (
      <div className={classes.root}>
        <AppBar position='static' color='inherit' elevation={0}>
          <Tabs
            value={value}
            onChange={this.handleChange}
          >
            <Tab label='Produto' />
            <Tab label='Informações' />
            <Tab label='Audiência' />
            <Tab label='Comportamentos' />
          </Tabs>
        </AppBar>

        <ProductType />
        <SelectedProduct />

        <Fade in={!!model.type && !model.content_id} unmountOnExit>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <Product />
            <Informations />
          </SwipeableViews>
        </Fade>
      </div>
    );
  }
}