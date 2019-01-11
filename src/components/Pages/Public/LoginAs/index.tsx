import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import logoWhite from 'assets/images/logo-white.png';
import AppRouter, { RouterContext } from 'components/Router';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { WithStyles } from 'decorators/withStyles';
import queryString from 'query-string';
import React, { PureComponent } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

interface IState {
  token: string;
  loading: boolean;
  error?: any;
}

interface IProps extends RouteComponentProps<{ t: string }, {}> {
  classes?: any;
  router?: AppRouter;
}

@WithStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    minHeight: '100vh',
    minWidth: '100vw',
    position: 'relative'
  },
  container: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
    width: '320px',
    height: '400px',
    maxWidth: 'calc(100% - 30px)',
    textAlign: 'center'
  },
  card: {
    minHeight: 0
  },
  logo: {
    textAlign: 'center',
    marginBottom: 20
  },
  logoImage: {
    maxWidth: 230
  }
}))
class LoginAsPage extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const token = queryString.parse(props.location.search).t as string;

    this.state = {
      token,
      loading: true,
    };
  }

  componentDidMount() {
    if (!this.state.token) return;

    authService.loginAs(this.state.token).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      this.props.router.navigate('/');
    }, error => {
      this.setState({ loading: false, error });
    });
  }

  redirect = () => this.props.router.navigate('/');

  render() {
    const { loading, token, error } = this.state;
    const { classes } = this.props;

    if (!token) {
      return (
        <Redirect to='/' />
      );
    }

    return (
      <div className={classes.root}>
        <div className={classes.container}>

          <div className={classes.logo}>
            <img src={logoWhite} className={classes.logoImage} />
          </div>

          <Card className={classes.card}>
            {loading &&
              <CardContent>
                <CircularProgress />
                <Typography variant='subtitle1'>Verificando Acesso...</Typography>
              </CardContent>
            }

            {!!error &&
              <CardContent>
                <ErrorMessage error={error} />
                <Button variant='outlined' color='secondary' onClick={this.redirect}>Fazer login</Button>
              </CardContent>
            }
          </Card>

        </div>
      </div>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router => <LoginAsPage {...props} ref={ref} router={router} />}
  </RouterContext.Consumer>
));
