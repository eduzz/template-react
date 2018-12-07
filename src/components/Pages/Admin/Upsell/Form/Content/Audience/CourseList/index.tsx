import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import CourseItem from './CourseItem';
import upsellService from 'services/upsell';
import rxjsOperators from 'rxjs-operators';
import Loading from 'components/Shared/Loading';
import { WithRouter } from 'decorators/withRouter';
import { UpsellFormContext, IUpsellFormContext } from '../../../Context';
import CardContent from '@material-ui/core/CardContent';
import ErrorMessage from 'components/Shared/ErrorMessage';

interface IProps {
  match?: any;
}

interface IState {
  error?: any;
}

@WithRouter()
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
        rxjsOperators.bindComponent(this),
        rxjsOperators.logError(),
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

    if (!courses)
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