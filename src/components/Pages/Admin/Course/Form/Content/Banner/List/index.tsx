import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import AppRouter from 'components/Router';
import ErrorMessage from 'components/Shared/ErrorMessage';
import { WithStyles } from 'decorators/withStyles';
import { IBanner } from 'interfaces/models/banner';
import AddIcon from 'mdi-react/AddIcon';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import bannerService from 'services/banner';

import BannerItem from './ListItem';

interface IState {
  error?: any;
  banners?: IBanner[];
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
export default class BannerList extends PureComponent<IProps, IState> {
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
    this.setState({ error: null, banners: null });

    bannerService.list().pipe(
      rxjsOperators.delay(1000),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe((banners: any) => {
      this.setState({ banners });
    }, (error: any) => this.setState({ error }));
  }

  handleDelete = (id: number | string) => {
    this.setState(state => ({
      banners: state.banners.filter((banner: any) => banner.id !== id),
    }));
  }

  handleNewModule = () => {

  }

  render() {
    const { classes } = this.props;
    const { banners, error, orderBy, orderDirection } = this.state;
    console.log(orderBy, orderDirection);
    return (
      <Fragment>
        <Card>
          <CardContent>
            <Grid container spacing={16} alignItems='center'>
              <Grid item xs={true}>
                <Typography variant='subheading'>
                  Listagem de Anúncio
              </Typography>
              </Grid>
              <Grid item xs={false}>
                <Button
                  className={classes.button}
                  color='secondary'
                  variant='extendedFab'
                  aria-label='Adicionar Anúncio'
                //onClick={this.handleNewBanner}
                >
                  <AddIcon className={classes.extendedIcon} />
                  Adicionar Anúncio
                </Button>
              </Grid>
            </Grid>
          </CardContent>

          {!error && !banners &&
            <CardContent className={classes.loader}>
              <CircularProgress color='secondary' />
            </CardContent>
          }

          {!!error &&
            <CardContent>
              <ErrorMessage error={error} tryAgain={this.loadData} />
            </CardContent>
          }

          {!!banners &&
            <List disablePadding>
              {banners.map(banner => (
                <BannerItem
                  key={banner.id}
                  banner={banner}
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