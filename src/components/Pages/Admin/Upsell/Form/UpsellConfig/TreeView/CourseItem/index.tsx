import React, { Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ModuleItem from './ModuleItem';
import Checkbox from '@material-ui/core/Checkbox';

interface IProps {
  course: any;
  classes?: any;
  onChange?: any;
}

interface IState {
  open: boolean;
  openSpecific: boolean;
}

@WithStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
}))
export default class CourseItem extends React.PureComponent<IProps, IState> {
  private allChecked: boolean;
  private allUnchecked: boolean;

  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
      openSpecific: false,
    };
  }

  handleToggle = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  }

  handleToggleSpecific = () => {
    this.setState(state => ({
      openSpecific: !state.openSpecific,
    }));
  }

  handleModuleChange = (modifiedModule: any) => {
    const { onChange, course } = this.props;

    if (onChange) {
      onChange({
        ...course,
        modules: course.modules.map((module: any) => (module.id === modifiedModule.id ? modifiedModule : module)),
      });
    }
  }

  handleToggleAll = (e: any) => {
    e.stopPropagation();

    const { onChange, course } = this.props;

    if (onChange) {
      onChange({
        ...course,
        modules: course.modules.map((module: any) => ({
          ...module,
          checked: !this.allChecked,
          lessons: module.lessons.map((lesson: any) => ({
            ...lesson,
            checked: !this.allChecked,
          })),
        })),
      });
    }
  }

  handleChangeCoursePage = () => {
    const { onChange, course } = this.props;

    if (onChange) {
      onChange({
        ...course,
        course_page: !course.course_page,
      });
    }
  }

  render() {
    const { course } = this.props;
    const { openSpecific } = this.state;

    this.allChecked = course.modules.every((module: any) => module.checked);
    this.allUnchecked = course.modules.every((module: any) => module.lessons.every((lesson: any) => !lesson.checked));
    const indeterminate = !(this.allChecked || this.allUnchecked);

    return (
      <Fragment>
        <ListItem button onClick={this.handleToggle}>
          <ListItemText primary={course.title} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem>
              <Checkbox
                checked={course.course_page}
                onChange={this.handleChangeCoursePage}
              />
              <ListItemText primary='Mostrar na tela do curso' />
            </ListItem>
            {course.modules && Boolean(course.modules.length) &&
              <Fragment>
                <ListItem button onClick={this.handleToggleSpecific}>
                  <Checkbox
                    checked={this.allChecked}
                    indeterminate={indeterminate}
                    onClick={this.handleToggleAll}
                  />
                  <ListItemText primary='Mostrar nas telas de aula' />
                  {openSpecific ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSpecific} timeout='auto' unmountOnExit>
                  {course.modules.map((module: any, index: number) =>
                    <ModuleItem
                      key={index}
                      module={module}
                      onChange={this.handleModuleChange}
                    />
                  )}
                </Collapse>
              </Fragment>
            }
          </List>
        </Collapse>
      </Fragment>
    );
  }
}