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
import ModalCustom from 'components/Shared/ModalCustom';
import { WithStyles } from 'decorators/withStyles';
import { IAuthor } from 'interfaces/models/author';
import ArrowDownIcon from 'mdi-react/ArrowDownIcon';
import ArrowUpIcon from 'mdi-react/ArrowUpIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import SortVariantIcon from 'mdi-react/SortVariantIcon';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import authorService from 'services/author';

import AuthorForm from './Form';
import AuthorItem from './ListItem';

interface IState {
  authors?: IAuthor[];
  error?: any;
  orderBy: string;
  orderDirection: 'asc' | 'desc';
  formModal: boolean;
}

interface IProps {
  classes?: any;
  router?: AppRouter;
}

@WithStyles({
  loader: {
    textAlign: 'center'
  }
})
class AuthorIndexPage extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      orderBy: 'title',
      orderDirection: 'asc',
      formModal: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ error: null, authors: null });
    const { orderBy, orderDirection } = this.state;

    authorService.list(orderBy, orderDirection).pipe(
      rxjsOperators.delay(1000),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(authors => {
      this.setState({ authors });
    }, error => this.setState({ error }));
  }

  handleChangeOrderBy = (orderBy: string) => {
    this.setState({ orderBy }, () => this.loadData());
  }

  toggleOrderDirection = () => {
    this.setState({ orderDirection: this.state.orderDirection === 'asc' ? 'desc' : 'asc' }, () => this.loadData());
  }

  handleModal = () => {
    return this.setState({ formModal: !this.state.formModal, });
  }

  render() {
    const { classes } = this.props;
    const { authors, error, orderBy, orderDirection } = this.state;

    return (
      <Fragment>
        <Toolbar>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={true}>
              <Typography variant='h6' color='inherit' noWrap>Autores</Typography>
            </Grid>

            <Grid item xs={false}>
              <Button variant='contained' color='secondary' onClick={this.handleModal}><PlusIcon /> Criar novo autor</Button>
            </Grid>
          </Grid>
        </Toolbar>

        <Card>
          <CardContent>
            <Grid container spacing={16} alignItems='center'>
              <Grid item xs={true}>
                <Typography variant='subtitle1'>Listagem de autores</Typography>
              </Grid>

              <Grid item xs={false}>
                <FieldSelect
                  value={orderBy}
                  options={[{ value: 'title', label: 'Nome' }, { value: 'created_at', label: 'Data de criação' }]}
                  onChange={this.handleChangeOrderBy}
                  fullWidth={false}
                  disabled={!error && !authors}
                  margin='none'
                />
              </Grid>

              <Grid item xs={false}>
                <IconButton
                  disabled={!error && !authors}
                  onClick={this.toggleOrderDirection}
                >
                  {orderDirection === 'asc' ? <ArrowDownIcon /> : <ArrowUpIcon />}
                  <SortVariantIcon />
                </IconButton>
              </Grid>

            </Grid>
          </CardContent>

          {!error && !authors &&
            <CardContent className={classes.loader}>
              <CircularProgress color='secondary' />
            </CardContent>
          }

          {!!error &&
            <CardContent>
              <ErrorMessage error={error} tryAgain={this.loadData} />
            </CardContent>
          }

          {!!authors &&
            <CardContent>
              {authors.map(author => (
                <AuthorItem key={author.id} author={author} />
              ))}
            </CardContent>
          }

          <ModalCustom open={this.state.formModal} modalTitle='Autor' modalContent={<AuthorForm />}>
            <Button onClick={this.handleModal} color='secondary'>Fechar</Button>
          </ModalCustom>
        </Card>
      </Fragment>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router => <AuthorIndexPage {...props} {...ref} router={router} />}
  </RouterContext.Consumer>
));