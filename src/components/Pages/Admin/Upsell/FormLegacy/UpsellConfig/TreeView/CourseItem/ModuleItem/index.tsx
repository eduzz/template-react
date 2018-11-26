import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { WithStyles } from 'decorators/withStyles';
import { IUpsell } from 'interfaces/models/upsell';
import React, { SyntheticEvent } from 'react';

import LessonItem from './LessonItem';

interface IProps {
  classes?: any;
  module: IUpsell['courses'][0]['modules'][0];
  onChange: (module: IUpsell['courses'][0]['modules'][0]) => void;
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
    this.setState(state => ({ open: !state.open }));
  }

  handleLessonChange = (modifiedLesson: IUpsell['courses'][0]['modules'][0]['lessons'][0]) => {
    const { onChange, module } = this.props;
    const lessons = module.lessons.map(lesson => (lesson.id === modifiedLesson.id ? modifiedLesson : lesson));

    if (onChange) {
      onChange({
        ...module,
        checked: lessons.every(lesson => lesson.checked),
        lessons,
      });
    }
  }

  handleModuleChange = (e: SyntheticEvent) => {
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