import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppRouter from 'components/Router';
import { WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import { IBanner } from 'interfaces/models/banner';
import AddIcon from 'mdi-react/AddIcon';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import bannerService from 'services/banner';

import BannerDialog from './BannerDialog';
import ListContainer from './ListContainer';

//import ErrorMessage from 'components/Shared/ErrorMessage';
//import { arrayMove, SortEnd } from 'react-sortable-hoc';
interface IState {
  error?: any;
  banners?: IBanner[];
}

interface IProps {
  classes?: any;
  router?: AppRouter;
  match?: any;
}

@WithRouter()
@WithStyles(theme => ({
  loader: {
    textAlign: 'center',
  }
}))
export default class BannerList extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: null, banners: null };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.loadData(id || 0);
  }

  loadData = (courseID: number) => {
    bannerService.getBannerlist(courseID).pipe(
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

  handleNewBanner = () => {
    bannerService.newBanner();
  }

  /* onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    bannerService.setBanners(arrayMove(this.state.banners, oldIndex, newIndex));
  } */

  render() {
    const { classes } = this.props;
    const { banners, error } = this.state;

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
                  onClick={this.handleNewBanner}
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
            {/* <CardContent>
              <ErrorMessage error={error} tryAgain={this.loadData} />
            </CardContent> */}
          }

          {!!banners &&
            <ListContainer
              banners={banners}
              //onSortEnd={this.onSortEnd}
              useDragHandle
            />
          }
        </Card>

        <BannerDialog />
      </Fragment>
    );
  }
}