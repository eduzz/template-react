import { CardContent, CircularProgress } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { WithStyles } from 'decorators/withStyles';
import { ICertificate } from 'interfaces/models/certificate';
import React, { PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import certificateService from 'services/certificate';

import CertificateItem from './ListItem';

interface IState {
  error?: any;
  certificates?: ICertificate[];
}

interface IProps {
  classes?: any;
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
export default class CertificateList extends PureComponent<IProps, IState> {
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
    );
  }
}