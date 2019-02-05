import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import logoWhite from 'assets/images/logo-white.png';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { IRouteProps } from 'decorators/withRouter';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import queryString from 'query-string';
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

import styles from './styles';

interface IState {
  token: string;
  loading: boolean;
  error?: any;
}

interface IProps extends IStyledProps, IRouteProps {
}

@WithStyles(styles)
export default class LoginAsPage extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      token: queryString.parse(props.location.search).t as string,
      loading: true,
    };
  }

  componentDidMount() {
    if (!this.state.token) return;

    authService.loginAs(this.state.token).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(redirect => {
      if (redirect) {
        window.location.href = redirect;
        return;
      }

      this.props.history.push('/');
    }, error => {
      this.setState({ loading: false, error });
    });
  }

  redirect = () => this.props.history.push('/');

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