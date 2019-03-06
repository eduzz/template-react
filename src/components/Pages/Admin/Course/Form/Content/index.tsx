import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import { IForm } from '..';
import Advanced from './Advanced';
import Banner from './Banner';
import BasicInfo from './BasicInfo';
import Email from './Email';
import ModulesLessons from './ModulesLessons';
import Personalizations from './Personalizations';

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
  form: IForm;
}

@WithStyles(theme => ({
  root: {
    marginTop: 16,
  },
}), { withTheme: true })
export default class Content extends React.Component<IProps> {
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
    const { classes, theme, form } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position='static'
          color='default'
          elevation={0}
        >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor='primary'
            textColor='primary'
          >
            <Tab label='Informações Básicas' />
            <Tab label='Configurações Avançadas' />
            <Tab label='Modulos e Aulas' />
            <Tab label='Personalizações' />
            <Tab label='Opções de Email' />
            {!!form.model.id &&
              <Tab label='Anúncios' />
            }
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <BasicInfo form={form} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Advanced form={form} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <ModulesLessons />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Personalizations form={form} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Email form={form} />
          </TabContainer>
          {!!form.model.id &&
            <TabContainer dir={theme.direction}>
              <Banner />
            </TabContainer>
          }
        </SwipeableViews>
      </div>
    );
  }
}