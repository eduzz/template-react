import React, { PureComponent, Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import Typography from '@material-ui/core/Typography';
// import studentService from 'services/student';
// import rxjsOperators from 'rxjs-operators';
import { WithRouter } from 'decorators/withRouter';
import { IStudentActivity } from 'interfaces/models/student';
import CardContent from '@material-ui/core/CardContent';
import ErrorMessage from 'components/Shared/ErrorMessage';
import List from '@material-ui/core/List';
import Loading from 'components/Shared/Loading';
import ActivityItem from './ActivityItem';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

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
    this.setState({
      activities: [
        {
          id: 1,
          created_at: '2018-11-22 09:11:19.0000000',
          title: 'Acessou a vitrine',
        },
        {
          id: 2,
          created_at: '2018-11-22 09:11:19.0000000',
          title: 'Assistiu a aula: Como comprar paletes para construir móveis',
        },
      ],
    });

    // this.setState({
    //   error: null,
    //   courses: null,
    // });

    // studentService.getStudentCourses(this.props.match.params.id).pipe(
    //   rxjsOperators.logError(),
    //   rxjsOperators.bindComponent(this),
    // ).subscribe(courses => {
    //   this.setState({
    //     courses,
    //     error: null,
    //   });
    // }, error => {
    //   this.setState({
    //     error,
    //   });
    // });
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
            <Grid container alignItems='center' spacing={40}>
              <Grid item xs='auto'>
                <Typography variant='subtitle2' noWrap>Realizado em:</Typography>
              </Grid>
              <Grid item xs={true}>
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