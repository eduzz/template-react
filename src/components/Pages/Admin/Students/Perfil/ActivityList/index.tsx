import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ErrorMessage from 'components/Shared/ErrorMessage';
import Loading from 'components/Shared/Loading';
import { WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import { IStudentActivity } from 'interfaces/models/student';
import React, { Fragment, PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

import ActivityItem from './ActivityItem';

// import studentService from 'services/student';
// import RxOp from 'rxjs-operators';
interface IProps {
  classes?: any;
  history?: any;
  match?: any;
}

interface IState {
  activities: IStudentActivity[];
  error?: any;
}

@WithRouter()
@WithStyles(theme => ({
  header: {
    border: '1px solid',
    borderBottom: '2px solid ' + theme.variables.contentBorderColor,
    color: '#8C9198',
    borderColor: theme.variables.contentBorderColor,
  }
}))
export default class StudentActivity extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      activities: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    studentService.getStudentLogs(this.props.match.params.id).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(activities => {
      this.setState({ activities, error: null });
    }, error => {
      this.setState({ error });
    });
  }

  render() {
    const { activities, error } = this.state;

    if (!!error)
      return (
        <CardContent>
          <ErrorMessage error={error} tryAgain={this.loadData} />
        </CardContent>
      );

    if (!activities)
      return <Loading />;

    if (!activities.length)
      return (
        <CardContent>
          <Typography variant='subtitle1' align='center'><strong>Nenhuma atividade encontrada</strong></Typography>
        </CardContent>
      );

    return (
      <Fragment>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Realizado em</TableCell>
              <TableCell>Atividade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity, index) =>
              <ActivityItem key={index} activity={activity} />
            )}
          </TableBody>
        </Table>
      </Fragment>
    );
  }
}