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
    };
  }

  handleToggle = () => {
    this.setState(state => ({
      open: !state.open,
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

  render() {
    const { course } = this.props;

    return (
      <Fragment>
        <ListItem button onClick={this.handleToggle}>
          <ListItemText primary={course.title} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem>
              <Checkbox checked={course.highlight} />
              <ListItemText primary='Banner de oferta na vitrine' />
            </ListItem>
            <ListItem>
              <Checkbox checked={course.coursePage} />
              <ListItemText primary='Listagem de módulos e aulas' />
            </ListItem>
            <ListItem>
              <Checkbox checked={course.allLessons} />
              <ListItemText primary='Mostrar em todas as aulas' />
            </ListItem>
            <ListItem button>
              <Checkbox checked={course.specificLessons} />
              <ListItemText primary='Mostrar em aulas específicas' />
              {course.modules && course.modules.length && (course.specificLessons ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {course.modules && course.modules.length &&
              <Collapse in={true} timeout='auto' unmountOnExit>
                {course.modules.map((module: any, index: number) =>
                  <ModuleItem
                    key={index}
                    module={module}
                    onChange={this.handleModuleChange}
                  />
                )}
              </Collapse>
            }
          </List>
        </Collapse>
      </Fragment>
    );
  }
}