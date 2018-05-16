import { Button, Tooltip } from '@material-ui/core';
import { WithStyles } from 'decorators/withStyles';
import { MdiReactIconComponentType } from 'mdi-react';
import React, { PureComponent } from 'react';

interface IProps {
  classes?: any;
  hasTabs?: boolean;
  actions: {
    icon: MdiReactIconComponentType,
    tooltip: string;
    onClick: Function;
  }[];
}

@WithStyles({
  root: {
    position: 'fixed',
    top: 30,
    right: 20,
    zIndex: 1100
  },
  withTabs: {
    top: 75
  }
})
export default class FabButton extends PureComponent<IProps> {
  render() {
    const { actions } = this.props;

    if (actions.length === 1) {
      return this.renderOne();
    }

    return (<div></div>);
  }

  renderOne() {
    const { classes, hasTabs, actions } = this.props;
    const action = actions[0];

    return (
      <div className={classes.root + ' header-app ' + (hasTabs ? classes.withTabs : '')}>
        <Tooltip title={action.tooltip}>
          <Button variant='fab' color='secondary' onClick={() => action.onClick()}>
            <action.icon />
          </Button>
        </Tooltip>
      </div>
    );
  }
}