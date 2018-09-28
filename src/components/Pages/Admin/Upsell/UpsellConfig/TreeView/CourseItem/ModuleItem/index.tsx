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
  module: any;
  classes?: any;
  onChange?: any;
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

  handleLessonChange = (modifiedLesson: any) => {
    const { onChange, module } = this.props;

    if (onChange) {
      onChange({
        ...module,
        lessons: module.lessons.map((lesson: any) => (lesson.id === modifiedLesson.id ? modifiedLesson : lesson)),
      });
    }
  }

  handleModuleChange = () => {

  }

  render() {
    const { module, classes } = this.props;

    const allChecked = module.lessons.every((lesson: any) => lesson.checked);
    const allUnchecked = module.lessons.every((lesson: any) => !lesson.checked);
    const indeterminate = !(allChecked || allUnchecked);

    return (
      <div className={classes.nested}>
        <ListItem button onClick={this.handleToggle}>
          <Checkbox
            checked={allChecked}
            indeterminate={indeterminate}
          />
          <ListItemText primary={module.title} />
          {module.lessons && module.lessons.length && (this.state.open ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {module.lessons && module.lessons.length &&
          <Collapse in={this.state.open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {module.lessons.map((lesson: any, index: number) =>
                <LessonItem
                  key={index}
                  lesson={lesson}
                  onChange={this.handleLessonChange}
                />
              )}
            </List>
          </Collapse>
        }
      </div>
    );
  }
}