import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from 'components/Layout/Toolbar';
import { WithStyles } from 'decorators/withStyles';
import { ICertificate } from 'interfaces/models/certificate';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import certificateService from 'services/certificate';

import ErrorMessage from '../../../../Shared/ErrorMessage';
import Editor from './Editor';

interface IState {
  id: number;
  certificate?: ICertificate;
  loading: boolean;
  error?: any;
}

interface IProps {
  classes?: any;
}

@WithStyles({
  loader: {
    textAlign: 'center'
  }
})
export default class CertificateFormPage extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: props.match.params.id,
      loading: true
    };
  }

  componentDidMount() {
    if (!this.state.id) {
      this.setState({ loading: false });
      return;
    }

    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true, error: null });

    certificateService.get(this.state.id).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(certificate => {
      this.setState({ certificate, loading: false });
    }, error => this.setState({ error, loading: false }));
  }

  render() {
    const { id, loading, error, certificate } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar title={`${id ? 'Editar' : 'Novo'} certificado`} />

        <Card>
          {loading &&
            <CardContent className={classes.loader}>
              <CircularProgress color='secondary' />
            </CardContent>
          }

          {!!error &&
            <CardContent >
              <ErrorMessage error={error} tryAgain={this.loadData} />
            </CardContent>
          }

          {!loading && !error &&
            <Editor
              id={certificate ? certificate.id : null}
              title={certificate ? certificate.title : ''}
              default={certificate && certificate.default}
              config={certificate && certificate.config && JSON.parse(certificate.config)}
            />
          }
        </Card>
      </Fragment>
    );
  }
}