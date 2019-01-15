import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
    const { classes } = this.props;
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
      return <Typography variant='subtitle1' align='center'><strong>Nenhuma atividade encontrada!</strong></Typography>;

    return (
      <Fragment>
        <List disablePadding>
          <ListItem className={classes.header}>
            <Grid container spacing={40}>
              <Grid item sm={4} md={3} lg={2}>
                <Typography variant='subtitle2' noWrap>Realizado em:</Typography>
              </Grid>
              <Grid item sm={8} md={9} lg={10}>
                <Typography variant='subtitle2' noWrap>Atividade</Typography>
              </Grid>
            </Grid>
          </ListItem>

          {activities.map((activity, index) =>
            <ActivityItem key={index} activity={activity} />
          )}
        </List>
      </Fragment>
    );
  }
}