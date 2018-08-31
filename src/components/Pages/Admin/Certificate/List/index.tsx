import { CardContent, CircularProgress } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Toolbar from 'components/Layout/Toolbar';
import AppRouter, { RouterContext } from 'components/Router';
import ErrorMessage from 'components/Shared/ErrorMessage';
import FabButton from 'components/Shared/FabButton';
import { WithStyles } from 'decorators/withStyles';
import { ICertificate } from 'interfaces/models/certificate';
import PlusIcon from 'mdi-react/PlusIcon';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import certificateService from 'services/certificate';

import CertificateItem from './ListItem';

interface IState {
  error?: any;
  certificates?: ICertificate[];
}

interface IProps {
  classes?: any;
  router?: AppRouter;
}

@WithStyles(theme => ({
  title: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  loader: {
    textAlign: 'center'
  }
}))
class CertificateListPage extends PureComponent<IProps, IState> {
  actions = [{
    icon: PlusIcon,
    onClick: () => this.props.router.navigate('/certificados/novo')
  }];

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ error: null, certificates: null });

    certificateService.list().pipe(
      rxjsOperators.delay(1000),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(certificates => {
      this.setState({ certificates });
    }, error => this.setState({ error }));
  }

  render() {
    const { classes } = this.props;
    const { certificates, error } = this.state;

    return (
      <Fragment>
        <Toolbar title='Certificados' />

        <FabButton actions={this.actions} />

        <Card>
          <Typography className={classes.title} variant='subheading'>
            Cursos que foram atribuídos ao certificado
        </Typography>

          {!error && !certificates &&
            <CardContent className={classes.loader}>
              <CircularProgress color='secondary' />
            </CardContent>
          }

          {!!error &&
            <CardContent>
              <ErrorMessage error={error} tryAgain={this.loadData} />
            </CardContent>
          }

          {!!certificates && certificates.map(certificate =>
            <CertificateItem key={certificate.id} certificate={certificate} />
          )}
        </Card>
      </Fragment>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router => <CertificateListPage {...props} {...ref} router={router} />}
  </RouterContext.Consumer>
));