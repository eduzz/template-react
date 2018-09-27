import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LessonItem from './LessonItem';
import Checkbox from '@material-ui/core/Checkbox';

interface IProps {
  title: string;
  children?: any;
  classes?: any;
}

interface IState {
  open: boolean;
}

@WithStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
}))
export default class ModuleItem extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleToggle = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  }

  render() {
    const { title, children, classes } = this.props;

    return (
      <div className={classes.nested}>
        <ListItem button onClick={this.handleToggle}>
          <Checkbox />
          <ListItemText primary={title} />
          {children && children.length && (this.state.open ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {children && children.length &&
          <Collapse in={this.state.open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {children.map((lesson: any, index: number) =>
                <LessonItem
                  key={index}
                  title={lesson.title}
                />
              )}
            </List>
          </Collapse>
        }
      </div>
    );
  }
}