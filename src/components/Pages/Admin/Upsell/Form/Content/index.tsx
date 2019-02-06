import Card from '@material-ui/core/Card';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { ToolbarTabs } from 'components/Layout/ToolbarTabs';
import Fade from 'components/Shared/Fade';
import { WithStyles } from 'decorators/withStyles';
import React, { SyntheticEvent } from 'react';
import SwipeableViews from 'react-swipeable-views';

import { IUpsellFormContext, UpsellFormContext } from '../Context';
import Audience from './Audience';
import Behavior from './Behavior';
import Informations from './Informations';
import Midia from './Midia';
import Product from './Product';
import ProductType from './ProductType';
import SelectedProduct from './SelectedProduct';

interface IProps {
  classes?: any;
  theme?: any;
  step: number;
}

@WithStyles({
  container: {
    boxSizing: 'border-box',
    padding: 5
  },
}, { withTheme: true })
export default class Content extends React.Component<IProps> {
  static contextType = UpsellFormContext;
  public context: IUpsellFormContext;

  handleChange = (event: SyntheticEvent, step: number) => {
    this.context.updateFlowStep(step);
  }

  render() {
    const { theme, step, classes } = this.props;
    const { model, updateFlowStep } = this.context;

    return (
      <div>
        <ToolbarTabs>
          <Tabs
            value={step}
            onChange={this.handleChange}
            variant='scrollable'
            scrollButtons='off'
          >
            <Tab label='Produto' />
            <Tab disabled={!model.content_id} label='Informações' />
            <Tab disabled={!model.content_id} label='Audiência' />
            <Tab disabled={!model.content_id} label='Mídias' />
            <Tab disabled={!model.content_id} label='Comportamentos' />
          </Tabs>
        </ToolbarTabs>

        <Fade in={!model.type} absolute>
          <Card>
            <ProductType />
          </Card>
        </Fade>

        <Fade in={!!model.type && !model.content_id} absolute unmountOnExit>
          <Card>
            <Product />
          </Card>
        </Fade>

        <Fade in={!!model.content_id} unmountOnExit>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={step}
            onChangeIndex={updateFlowStep}
            animateHeight
          >
            <div className={classes.container}>
              <SelectedProduct />
            </div>
            <div className={classes.container}>
              <Informations />
            </div>
            <div className={classes.container}>
              <Audience />
            </div>
            <div className={classes.container}>
              <Midia />
            </div>
            <div className={classes.container}>
              <Behavior />
            </div>
          </SwipeableViews>
        </Fade>
      </div>
    );
  }
}