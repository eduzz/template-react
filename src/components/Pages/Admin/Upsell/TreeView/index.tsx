import React from 'react';
import List from '@material-ui/core/List';
import { WithStyles } from 'decorators/withStyles';
import CourseItem from './CourseItem';

interface IProps {
  classes?: any;
  onChange?: any;
  defaultValue?: any;
}

interface IState {
  open: boolean;
}

@WithStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
}))
export default class TreeView extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      open: true,
    };
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  }

  render() {
    const { defaultValue } = this.props;

    return (
      <List component='nav'>
        {defaultValue.map((course: any, index: number) =>
          <CourseItem
            key={index}
            title={course.title}
            children={course.children}
          />
        )}
      </List>
    );
  }
}