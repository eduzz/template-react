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
  private allChecked: boolean;
  private allUnchecked: boolean;

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
    const lessons = module.lessons.map((lesson: any) => (lesson.id === modifiedLesson.id ? modifiedLesson : lesson));

    if (onChange) {
      onChange({
        ...module,
        checked: lessons.every((lesson: any) => lesson.checked),
        lessons,
      });
    }
  }

  handleModuleChange = (e: any) => {
    e.stopPropagation();

    const { module, onChange } = this.props;

    onChange({
      ...module,
      checked: !this.allChecked,
      lessons: module.lessons.map((lesson: any) => ({
        ...lesson,
        checked: !this.allChecked,
      })),
    });
  }

  render() {
    const { module, classes } = this.props;

    this.allChecked = module.lessons.every((lesson: any) => lesson.checked);
    this.allUnchecked = module.lessons.every((lesson: any) => !lesson.checked);
    const indeterminate = !(this.allChecked || this.allUnchecked);

    return (
      <div className={classes.nested}>
        <ListItem button onClick={this.handleToggle}>
          <Checkbox
            checked={this.allChecked}
            indeterminate={indeterminate}
            onClick={this.handleModuleChange}
          />
          <ListItemText primary={module.title} />
          {module.lessons && Boolean(module.lessons.length) && (this.state.open ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {module.lessons && Boolean(module.lessons.length) &&
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