import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  classes?: any;
  theme?: any;
}

interface IState {
  value?: number;
}

@WithStyles(theme => ({
  root: {
    backgroundColor: '#fff',
  },
}), { withTheme: true })
export default class Content extends React.Component<IProps, IState> {
  state = {
    value: 0,
  };

  handleChange = (event: any, value: number) => {
    this.setState({ value });
  }

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  }

  render() {
    const { classes, theme, children } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position='static' color='inherit' elevation={0}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label='Produto' />
            <Tab label='Informações' />
            <Tab label='Audiência' />
            <Tab label='Comportamentos' />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          {children}
        </SwipeableViews>
      </div>
    );
  }
}