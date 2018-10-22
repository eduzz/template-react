import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import Toolbar from 'components/Layout/Toolbar';
import AppRouter, { RouterContext } from 'components/Router';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { WithStyles } from 'decorators/withStyles';
import { IUpsell } from 'interfaces/models/upsell';
import ArrowDownIcon from 'mdi-react/ArrowDownIcon';
import ArrowUpIcon from 'mdi-react/ArrowUpIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import SortVariantIcon from 'mdi-react/SortVariantIcon';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import upsellService from 'services/upsell';

import UpsellItem from './ListItem';

interface IState {
  error?: any;
  upsells?: IUpsell[];
  orderBy: string;
  orderDirection: 'asc' | 'desc';
}

interface IProps {
  classes?: any;
  router?: AppRouter;
}

@WithStyles(theme => ({
  loader: {
    textAlign: 'center',
  }
}))
class UpsellListPage extends PureComponent<IProps, IState> {
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
    this.setState({ error: null, upsells: null });
    const { orderBy, orderDirection } = this.state;

    upsellService.list(orderBy, orderDirection).pipe(
      rxjsOperators.delay(1000),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe((upsells: any) => {
      this.setState({ upsells });
    }, (error: any) => this.setState({ error }));
  }

  handleChangeOrderBy = (orderBy: string) => {
    this.setState({ orderBy }, () => this.loadData());
  }

  toggleOrderDirection = () => {
    this.setState({ orderDirection: this.state.orderDirection === 'asc' ? 'desc' : 'asc' }, () => this.loadData());
  }

  handleDelete = (id: number | string) => {
    this.setState(state => ({
      upsells: state.upsells.filter((upsell: any) => upsell.id !== id),
    }));
  }

  handleNew = () => this.props.router.navigate('/upsell/novo');

  render() {
    const { classes } = this.props;
    const { upsells, error, orderBy, orderDirection } = this.state;

    return (
      <Fragment>
        <Toolbar>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={true}>
              <Typography variant='h6' color='inherit' noWrap>Upsell</Typography>
            </Grid>

            <Grid item xs={false}>
              <Button variant='contained' color='secondary' onClick={this.handleNew}><PlusIcon /> Criar novo upsell</Button>
            </Grid>
          </Grid>
        </Toolbar>

        <Card>
          <CardContent>
            <Grid container spacing={16} alignItems='center'>
              <Grid item xs={true}>
                <Typography variant='subtitle1'>
                  Listagem de Upsell
                </Typography>
              </Grid>

              <Grid item xs={false}>
                <FieldSelect
                  value={orderBy}
                  options={[{ value: 'title', label: 'Título' }, { value: 'created_at', label: 'Data de criação' }]}
                  onChange={this.handleChangeOrderBy}
                  fullWidth={false}
                  disabled={!error && !upsells}
                  margin='none'
                />
              </Grid>

              <Grid item xs={false}>
                <IconButton
                  disabled={!error && !upsells}
                  onClick={this.toggleOrderDirection}
                >
                  {orderDirection === 'asc' ? <ArrowDownIcon /> : <ArrowUpIcon />}
                  <SortVariantIcon />
                </IconButton>
              </Grid>

            </Grid>
          </CardContent>

          {!error && !upsells &&
            <CardContent className={classes.loader}>
              <CircularProgress color='secondary' />
            </CardContent>
          }

          {!!error &&
            <CardContent>
              <ErrorMessage error={error} tryAgain={this.loadData} />
            </CardContent>
          }

          {!!upsells &&
            <List disablePadding>
              {upsells.map(upsell => (
                <UpsellItem
                  key={upsell.id}
                  upsell={upsell}
                  onDelete={this.handleDelete}
                />
              ))}
            </List>
          }
        </Card>
      </Fragment>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router => <UpsellListPage {...props} {...ref} router={router} />}
  </RouterContext.Consumer>
));