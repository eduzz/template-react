import React, { Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import CourseSelect from './CourseSelect';
import TreeView from './TreeView';
import Paper from '@material-ui/core/Paper';

interface IProps {
  classes?: any;
  onChange?: any;
}

interface IState {
  value: any;
}

@WithStyles(theme => ({
  treeViewLabel: {
    fontSize: 18,
  },
  treeViewContainer: {
    padding: 16,
    marginTop: 16,
  },
  treeViewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))
export default class UpsellConfig extends React.PureComponent<IProps, IState> {
  private treeView: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      value: [],
    };

    this.treeView = React.createRef();
  }

  handleAdd = (course: any) => {
    this.treeView.current.pushCourse(course);

    this.props.onChange && this.props.onChange(this.state.value);
  }

  render() {
    const { classes, onChange } = this.props;
    const { value } = this.state;

    return (
      <Fragment>
        <div className={classes.treeViewHeader}>
          <label className={classes.treeViewLabel}>
            Onde você quer aplicar?
          </label>
          <CourseSelect
            onAdd={this.handleAdd}
          />
        </div>
        <Paper className={classes.treeViewContainer}>
          <TreeView
            ref={this.treeView}
            defaultValue={value}
            onChange={onChange}
          />
        </Paper>
      </Fragment>
    );
  }
}