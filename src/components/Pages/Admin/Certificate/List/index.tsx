import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import Toolbar from 'components/Layout/Toolbar';
import AppRouter, { RouterContext } from 'components/Router';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { WithStyles } from 'decorators/withStyles';
import { ICertificate } from 'interfaces/models/certificate';
import ArrowDownIcon from 'mdi-react/ArrowDownIcon';
import ArrowUpIcon from 'mdi-react/ArrowUpIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import SortVariantIcon from 'mdi-react/SortVariantIcon';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import certificateService from 'services/certificate';

import CertificateItem from './ListItem';

interface IState {
  error?: any;
  certificates?: ICertificate[];
  orderBy: string;
  orderDirection: 'asc' | 'desc';
}

interface IProps {
  classes?: any;
  router?: AppRouter;
}

@WithStyles(theme => ({
  title: {
  },
  loader: {
    textAlign: 'center'
  }
}))
class CertificateListPage extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      orderBy: 'title',
      orderDirection: 'asc'
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ error: null, certificates: null });
    const { orderBy, orderDirection } = this.state;

    certificateService.list(orderBy, orderDirection).pipe(
      rxjsOperators.delay(1000),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(certificates => {
      this.setState({ certificates });
    }, error => this.setState({ error }));
  }

  handleChangeOrderBy = (orderBy: string) => {
    this.setState({ orderBy }, () => this.loadData());
  }

  toggleOrderDirection = () => {
    this.setState({ orderDirection: this.state.orderDirection === 'asc' ? 'desc' : 'asc' }, () => this.loadData());
  }

  handleNew = () => this.props.router.navigate('/certificados/novo');

  render() {
    const { classes } = this.props;
    const { certificates, error, orderBy, orderDirection } = this.state;

    return (
      <Fragment>
        <Toolbar>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={true}>
              <Typography variant='title' color='inherit' noWrap>Certificados</Typography>
            </Grid>

            <Grid item xs={false}>
              <Button variant='contained' color='secondary' onClick={this.handleNew}><PlusIcon /> Novo</Button>
            </Grid>
          </Grid>
        </Toolbar>

        <Card>
          <CardContent>
            <Grid container spacing={16} alignItems='center'>
              <Grid item xs={true}>
                <Typography className={classes.title} variant='subheading'>
                  Cursos que foram atribuídos ao certificado
                </Typography>
              </Grid>

              <Grid item xs={false}>
                <FieldSelect
                  value={orderBy}
                  options={[{ value: 'title', label: 'Título' }, { value: 'created_at', label: 'Data de criação' }]}
                  onChange={this.handleChangeOrderBy}
                  fullWidth={false}
                  disabled={!error && !certificates}
                  margin='none'
                />
              </Grid>

              <Grid item xs={false}>
                <IconButton
                  disabled={!error && !certificates}
                  onClick={this.toggleOrderDirection}
                >
                  {orderDirection === 'asc' ? <ArrowDownIcon /> : <ArrowUpIcon />}
                  <SortVariantIcon />
                </IconButton>
              </Grid>

            </Grid>
          </CardContent>

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

          {!!certificates && certificates.map(certificate => (
            <CertificateItem key={certificate.id} certificate={certificate} />
          ))}
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