import { WithStyles } from 'decorators/withStyles';
import { IUpsell } from 'interfaces/models/upsell';
import React, { Fragment } from 'react';

import CourseSelect from './CourseSelect';
import TreeView from './TreeView';
import Typography from '@material-ui/core/Typography';

interface IProps {
  classes?: any;
  courses: IUpsell['courses'];
  onChange: (courses: IUpsell['courses']) => void;
}

interface IState {
  value: any;
}

@WithStyles(theme => ({
  treeView: {
    border: '1px solid ' + theme.palette.divider,
    marginTop: 20,
    borderRadius: theme.shape.borderRadius,
    '& nav': {
      padding: 0
    },
    '& nav hr:last-child': {
      display: 'none'
    },
  },
  title: {
    marginBottom: 8,
  },
}))
export default class UpsellConfig extends React.PureComponent<IProps, IState> {
  private treeView: React.RefObject<TreeView>;

  constructor(props: IProps) {
    super(props);

    this.treeView = React.createRef();
  }

  handleAdd = (course: IUpsell['courses'][0]) => {
    this.treeView.current.pushCourse(course);
  }

  render() {
    const { classes, onChange, courses } = this.props;

    return (
      <Fragment>
        <Typography className={classes.title} variant='subtitle1'>Em quais cursos deseja exibir a promoção</Typography>

        <CourseSelect onAdd={this.handleAdd} />

        <div className={classes.treeView}>
          <TreeView
            ref={this.treeView}
            onChange={onChange}
            courses={courses}
          />
        </div>
      </Fragment>
    );
  }
}