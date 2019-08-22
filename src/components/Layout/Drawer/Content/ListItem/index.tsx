import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { darken } from '@material-ui/core/styles/colorManipulator';
import PermissionHide from 'components/Shared/PermissionHide';
import { WithStyles } from 'decorators/withStyles';
import ExpandMoreIcon from 'mdi-react/ExpandMoreIcon';
import React, { Fragment, PureComponent } from 'react';

import { IMenu } from '../..';

interface IState {
  expanded: boolean;
  active: boolean;
}

interface IProps {
  data: IMenu;
  onClick: (menu: IMenu) => void;
  classes?: any;
}

@WithStyles(theme => ({
  item: {
    'paddingLeft': 14,
    'opacity': 0.8,
    '&.active': {
      opacity: 1,
      background: darken(theme.palette.primary.main, 0.3)
    }
  },
  icon: {
    margin: '0',
    fill: theme.palette.primary.contrastText
  },
  text: {
    color: 'inherit'
  },
  expandablePanel: {
    'background': theme.palette.primary.main,
    'color': theme.palette.primary.contrastText,
    'marginLeft': -10,
    'boxShadow': 'none',
    'margin': 0,
    '&.active': {
      background: darken(theme.palette.primary.main, 0.1)
    }
  },
  expandableTitle: {
    '&:hover': {
      background: darken(theme.palette.primary.main, 0.1)
    }
  },
  expandableDetails: {
    padding: 0
  },
  innerList: {
    'padding': 0,
    'width': '100%',
    '& > div': {
      paddingLeft: 40
    }
  }
}))
export default class DrawerListItem extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { expanded: false, active: false };
  }

  // componentDidMount() {
  //   this.getRouter().observeChange().pipe(
  //     RxOp.logError(),
  //     RxOp.bindComponent(this)
  //   ).subscribe(location => {
  //     const { route } = this.props;

  //     const active = route.exact ?
  //       location.pathname === route.path :
  //       location.pathname.startsWith(route.path);

  //     this.setState({ active, expanded: active });
  //   });
  // }

  handleClick = () => {
    this.props.onClick(this.props.data);
  };

  handleSubClick = (menu: IMenu) => {
    this.props.onClick(menu);
  };

  handleExandedClick = (event: any, expanded: boolean) => {
    this.setState({ expanded });
  };

  render() {
    const { data } = this.props;

    return (
      <Fragment>
        <PermissionHide>
          {!data.submenu || !data.submenu.length ? this.renderSingle() : this.renderList()}
        </PermissionHide>
      </Fragment>
    );
  }

  renderSingle = () => {
    const { active } = this.state;
    const { data, classes } = this.props;

    return (
      <ListItem
        button
        disableGutters
        className={`${classes.item} ${active ? 'active' : ''}`}
        onClick={this.handleClick}
      >
        {!!data.icon && (
          <ListItemIcon className={classes.icon} classes={{ root: classes.text }}>
            <data.icon />
          </ListItemIcon>
        )}
        <ListItemText primary={data.display} classes={{ primary: classes.text }} />
      </ListItem>
    );
  };

  renderList = (): React.ReactNode => {
    const { expanded } = this.state;
    const { data, classes } = this.props;

    return (
      <ExpansionPanel
        expanded={expanded}
        onChange={this.handleExandedClick}
        className={`${classes.expandablePanel} ${expanded ? 'active' : ''}`}
      >
        <ExpansionPanelSummary
          className={classes.expandableTitle}
          expandIcon={<ExpandMoreIcon className={classes.icon} />}
        >
          {!!data.icon && (
            <ListItemIcon className={classes.icon} classes={{ root: classes.text }}>
              <data.icon />
            </ListItemIcon>
          )}
          <ListItemText primary={data.display} classes={{ primary: classes.text }} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expandableDetails}>
          <List className={classes.innerList}>
            {data.submenu.map(sub => (
              <DrawerListItem key={sub.path} data={sub} onClick={this.handleSubClick} />
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };
}
