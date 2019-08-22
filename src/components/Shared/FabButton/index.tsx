import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { WithStyles } from 'decorators/withStyles';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import React, { PureComponent } from 'react';

interface IProps {
  classes?: any;
  hasTabs?: boolean;
  actions: {
    icon: typeof MoreVertIcon;
    tooltip?: string;
    onClick: () => void;
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

    return null;
  }

  renderOne() {
    const { classes, hasTabs, actions } = this.props;
    const action = actions[0];

    return (
      <div className={classes.root + ' header-app ' + (hasTabs ? classes.withTabs : '')}>
        {action.tooltip && (
          <Tooltip title={action.tooltip}>
            <Fab color='secondary' onClick={action.onClick}>
              <action.icon />
            </Fab>
          </Tooltip>
        )}

        {!action.tooltip && (
          <Fab color='secondary' onClick={action.onClick}>
            <action.icon />
          </Fab>
        )}
      </div>
    );
  }
}
