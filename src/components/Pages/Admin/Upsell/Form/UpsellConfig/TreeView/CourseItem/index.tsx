import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Confirm from 'components/Shared/Confirm';
import { WithStyles } from 'decorators/withStyles';
import { IUpsell } from 'interfaces/models/upsell';
import TrashIcon from 'mdi-react/TrashIcon';
import React, { Fragment, SyntheticEvent } from 'react';

import ModuleItem from './ModuleItem';

interface IProps {
  classes?: any;
  course: IUpsell['courses'][0];
  onChange: (course: IUpsell['courses'][0]) => void;
  onDelete: (course: IUpsell['courses'][0]) => void;
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
  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
      openSpecific: false,
    };
  }

  get allChecked(): boolean { return this.props.course.modules.every(m => m.checked); }
  get allUnchecked(): boolean { return this.props.course.modules.every(m => m.lessons.every(l => !l.checked)); }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  }

  handleToggleSpecific = () => {
    this.setState(state => ({ openSpecific: !state.openSpecific }));
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
        modules: course.modules.map(module => ({
          ...module,
          checked: !this.allChecked,
          lessons: module.lessons.map(lesson => ({
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

  handleDelete = async (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const confirm = await Confirm.show(`Deseja remover o curso ${this.props.course.title}?`);
    if (!confirm) return;

    this.props.onDelete(this.props.course);
  }

  render() {
    const { course } = this.props;
    const { openSpecific } = this.state;

    const indeterminate = !(this.allChecked || this.allUnchecked);

    return (
      <Fragment>
        <ListItem button onClick={this.handleToggle}>
          <ListItemText primary={course.title} />
          <IconButton onClick={this.handleDelete}>
            <TrashIcon />
          </IconButton>
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
                  {course.modules.map((module, index) =>
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