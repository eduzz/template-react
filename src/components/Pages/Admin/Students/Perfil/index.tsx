import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from 'components/Layout/Toolbar';
import Toast from 'components/Shared/Toast';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import React, { Fragment, PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

import ActivityList from './ActivityList';
import CourseList from './CourseList';
import Info from './Info';

interface IState {
  exportUrl: string;
}

interface IProps extends IStyledProps {
  match?: any;
}

@WithStyles(theme => ({
  icon: {
    fill: theme.palette.text.primary,
  },
  card: {
    minHeight: 0,
  },
}))
export default class Perfil extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { exportUrl: null };
  }

  componentDidMount() {
    studentService.getStudentLogsUrl(this.props.match.params.id).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(exportUrl => {
      this.setState({ exportUrl });
    }, err => Toast.error(err));
  }

  render() {
    const { classes } = this.props;
    const { exportUrl } = this.state;

    return (
      <Fragment>
        <Toolbar title='Perfil do Aluno' />

        <Card className={classes.card}>
          <CardContent>
            <Info />
          </CardContent>

          <Divider />

          <CourseList />
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Grid container>
              <Grid item xs={true}>
                <Typography variant='h6'>Histórico de Atividades</Typography>
              </Grid>
              <Grid item>
                <Button
                  href={exportUrl}
                  target='_blank'
                  variant='contained'
                  color='secondary'
                  disabled={!exportUrl}
                >
                  Exportar
                </Button>
              </Grid>
            </Grid>
          </CardContent>

          <ActivityList />
        </Card>
      </Fragment>
    );
  }
}