import React, { Fragment, PureComponent } from 'react';
import { WithStyles } from 'decorators/withStyles';
import TagTextOutlineIcon from 'mdi-react/TagTextOutlineIcon';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

interface IProps {
  classes?: any;
  module: any;
}

interface IState {
  open: boolean;
}

@WithStyles(theme => ({
  root: {
    borderTop: 'solid 1px #d5d5d5',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
}))
export default class ModuleItem extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  }

  render() {
    const { module, classes } = this.props;

    return (
      <Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <TagTextOutlineIcon />
          </ListItemIcon>
          <ListItemText inset primary={module.name} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary='Starred' />
            </ListItem>
          </List>
        </Collapse>
      </Fragment>
    );
  }
}
