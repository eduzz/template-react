import React, { PureComponent } from 'react';
import Fade from '@material-ui/core/Fade';
import CardContent from '@material-ui/core/CardContent';
import { WithStyles } from 'decorators/withStyles';
import { UpsellFormContext, IUpsellFormContext } from '../../Context';

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    position: 'relative',
  },
  content: {
    paddingTop: theme.spacing.unit * 6,
    background: '#fff',
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
  },
}))
export default class SelectedProduct extends PureComponent<IProps> {
  static contextType: typeof UpsellFormContext = UpsellFormContext;
  context: IUpsellFormContext;

  render() {
    const { classes } = this.props;
    const { model } = this.context;

    return (
      <div className={classes.root}>
        <Fade in={!model.type}>
          <CardContent className={classes.content}>
            test
          </CardContent>
        </Fade>
      </div>
    );
  }
}