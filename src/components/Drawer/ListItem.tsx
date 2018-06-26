import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { WithStyles } from 'decorators/withStyles';
import { IAppRoute } from 'interfaces/route';
import { IUserToken } from 'interfaces/userToken';
import ExpandMoreIcon from 'mdi-react/ExpandMoreIcon';
import React, { PureComponent } from 'react';

import { IAppRouteParsed } from './parser';

interface IState {
  expanded: boolean;
}

interface IProps {
  user: IUserToken;
  route: IAppRouteParsed;
  onClick: (route: IAppRoute) => void;
  classes?: any;
}

@WithStyles(theme => ({
  item: {
    paddingLeft: 14
  },
  icon: {
    margin: '0',
    fill: theme.palette.primary.contrastText
  },
  text: {
    color: 'inherit'
  },
  expandablePanel: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginLeft: -10,
    boxShadow: 'none',
    margin: 0,
  },
  expandableTitle: {
    '&:hover': {
      background: darken(theme.palette.primary.main, 0.10)
    }
  },
  expandableDetails: {
    padding: 0
  },
  innerList: {
    padding: 0,
    width: '100%',
    '& > div': {
      paddingLeft: 40
    }
  }
}))
export default class DrawerListItem extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { expanded: false };
  }

  handleClick = () => {
    this.props.onClick(this.props.route);
  }

  handleSubClick = (route: IAppRouteParsed) => {
    this.props.onClick(route);
  }

  handleExandedClick = (event: any, expanded: boolean) => {
    this.setState({ expanded });
  }

  canAccess = () => {
    const { route, user } = this.props;

    if (route.allowAnonymous) return true;
    if (!user) return false;
    if (!route.roles) return true;

    return user.canAccess(...route.roles);
  }

  render() {
    const { route } = this.props;

    if (!this.canAccess()) {
      return null;
    }

    return !route.subRoutes.length ?
      this.renderSingle() :
      this.renderList();
  }

  renderSingle = () => {
    const { route, classes } = this.props;

    return (
      <ListItem button disableGutters className={classes.item} onClick={this.handleClick}>
        {!!route.sideDrawer.icon &&
          <ListItemIcon className={classes.icon} classes={{ root: classes.text }}>
            <route.sideDrawer.icon />
          </ListItemIcon>
        }
        <ListItemText primary={route.sideDrawer.display} classes={{ primary: classes.text }} />
      </ListItem>
    );
  }

  renderList = (): React.ReactNode => {
    const { expanded } = this.state;
    const { route, classes, user } = this.props;

    return (
      <ExpansionPanel expanded={expanded} onChange={this.handleExandedClick} className={classes.expandablePanel}>
        <ExpansionPanelSummary className={classes.expandableTitle} expandIcon={<ExpandMoreIcon className={classes.icon} />}>
          {!!route.sideDrawer.icon &&
            <ListItemIcon className={classes.icon} classes={{ root: classes.text }}>
              <route.sideDrawer.icon />
            </ListItemIcon>
          }
          <ListItemText primary={route.sideDrawer.display} classes={{ primary: classes.text }} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expandableDetails}>
          <List className={classes.innerList}>
            {route.subRoutes.map(sub =>
              <DrawerListItem key={sub.path} user={user} route={sub} onClick={this.handleSubClick} />
            )}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}