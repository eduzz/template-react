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
  title: string;
  modules?: any;
  classes?: any;
}

interface IState {
  open: boolean;
  specific: boolean;
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
      specific: false,
    };
  }

  handleToggle = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  }

  toggleSpecific = () => {
    this.setState(state => ({
      specific: !state.specific,
    }));
  }

  render() {
    const { title, modules } = this.props;

    return (
      <Fragment>
        <ListItem button onClick={this.handleToggle}>
          <ListItemText primary={title} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem>
              <Checkbox />
              <ListItemText primary='Banner de oferta na vitrine' />
            </ListItem>
            <ListItem>
              <Checkbox />
              <ListItemText primary='Listagem de módulos e aulas' />
            </ListItem>
            <ListItem>
              <Checkbox />
              <ListItemText primary='Mostrar em todas as aulas' />
            </ListItem>
            <ListItem button onClick={this.toggleSpecific}>
              <Checkbox />
              <ListItemText primary='Mostrar em aulas específicas' />
              {modules && modules.length && (this.state.specific ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {modules && modules.length &&
              <Collapse in={this.state.specific} timeout='auto' unmountOnExit>
                {modules.map((module: any, index: number) =>
                  <ModuleItem
                    key={index}
                    title={module.title}
                    lessons={module.lessons}
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