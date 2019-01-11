import React, { PureComponent } from 'react';
import CourseItem from './CourseItem';
import upsellService from 'services/upsell';
import RxOp from 'rxjs-operators';
import Loading from 'components/Shared/Loading';
import { WithRouter } from 'decorators/withRouter';
import { UpsellFormContext, IUpsellFormContext } from '../../../Context';
import CardContent from '@material-ui/core/CardContent';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { WithStyles } from 'decorators/withStyles';
import List from '@material-ui/core/List';

interface IProps {
  match?: any;
  classes?: any;
}

interface IState {
  error?: any;
}

@WithRouter()
@WithStyles({
  root: {
    height: 300,
  },
})
export default class CourseList extends PureComponent<IProps, IState> {
  static contextType = UpsellFormContext;
  context: IUpsellFormContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      error: null,
    };
  }

  loadData = () => {
    this.setState({
      error: null,
    });

    if (!this.props.match.params.id) {
      upsellService.getTreeCourses().pipe(
        RxOp.bindComponent(this),
        RxOp.logError(),
      ).subscribe(courses => {
        this.context.updateModel(model => model.courses = courses)();
      }, error => {
        this.setState({
          error: true,
        });
      });
    }
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { error } = this.state;
    const { courses } = this.context.model;

    if (error)
      return (
        <CardContent>
          <ErrorMessage error={error} tryAgain={this.loadData} />
        </CardContent>
      );

    if (!courses.length)
      return <Loading />;

    return (
      <List disablePadding>
        {courses.map((course, index) => (
          <CourseItem
            key={index}
            course={course}
          />
        ))
        }
      </List>
    );
  }
}