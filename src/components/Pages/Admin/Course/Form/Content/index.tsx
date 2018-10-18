import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';

function TabContainer({ children, dir }: any) {
  return (
    <Typography component='div' dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

interface IProps {
  classes?: any;
  theme?: any;
}

@WithStyles(theme => ({
  root: {
    marginTop: 16,
    // backgroundColor: theme.palette.background.paper,
  },
}), { withTheme: true })
export default class FullWidthTabs extends React.Component<IProps> {
  state = {
    value: 0,
  };

  handleChange = (event: any, value: any) => {
    this.setState({ value });
  }

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position='static' color='default'>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor='primary'
            textColor='primary'
            fullWidth
          >
            <Tab label='Informações Básicas' />
            <Tab label='Configurações Avançadas' />
            <Tab label='Personalizações' />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>Informações Basicas</TabContainer>
          <TabContainer dir={theme.direction}>Configurações Avançadas</TabContainer>
          <TabContainer dir={theme.direction}>Personalizações</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}