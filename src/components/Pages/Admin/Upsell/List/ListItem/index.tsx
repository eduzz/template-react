import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import AppRouter, { RouterContext } from 'components/Router';
import Confirm from 'components/Shared/Confirm';
import DropdownMenu from 'components/Shared/DropdownMenu';
import Toast from 'components/Shared/Toast';
import { WithStyles } from 'decorators/withStyles';
import { IUpsellList } from 'interfaces/models/upsell';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import upsellService from 'services/upsell';
import EyeIcon from 'mdi-react/EyeIcon';
import CursorDefaultIcon from 'mdi-react/CursorDefaultIcon';
import ChartPieIcon from 'mdi-react/ChartPieIcon';
import ArrowUpIcon from 'mdi-react/ArrowUpIcon';

interface IProps {
  classes?: any;
  upsell: IUpsellList;
  router?: AppRouter;
  onDelete?: any;
}

@WithStyles(theme => ({
  root: {
    border: '1px solid #D8D8D8',
    borderRadius: 4,
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  avatar: {
    borderRadius: 2,
  },
  icon: {
    fill: '#596375',
    marginRight: 4,
    width: 20,
  },
  greenIcon: {
    fill: '#009358',
  },
  title: {
    color: '#8C9198',
  },
}))
class UpsellItem extends PureComponent<IProps> {
  actions = [{
    text: 'Editar',
    icon: SquareEditOutlineIcon,
    handler: () => this.props.router.navigate(`/upsell/${this.props.upsell.id}/editar`),
  }, {
    text: 'Excluir',
    icon: TrashCanIcon,
    handler: () => this.handleDelete(),
  }];

  handleDelete = async () => {
    const { upsell, onDelete } = this.props;

    const confirm = await Confirm.show(`Deseja excluir o upsell ${upsell.title}?`);
    if (!confirm) return;

    upsellService.delete(upsell.id).pipe(
      rxjsOperators.loader(),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      Toast.show('Upsell excluído com sucesso');

      onDelete && onDelete(upsell.id);
    }, (err: any) => Toast.error(err));
  }

  handleImageError = (e: any) => {
    e.target.src = this.getRandomImage();
  }

  randomizeInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

  getRandomImage = (): string => {
    return `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${this.randomizeInt(1447)}.png`;
  }

  render() {
    const { upsell, classes } = this.props;

    return (
      <ListItem className={classes.root}>
        <Grid container spacing={16} alignItems='center'>
          <Grid item>
            <Grid container>
              <img
                alt=''
                className={classes.avatar}
                src={this.getRandomImage()}
                onError={this.handleImageError}
                height={44}
              />
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Typography variant='subtitle2' className={classes.title} noWrap>{upsell.title}</Typography>
          </Grid>

          <Grid item xs={true}>
            <Typography variant='subtitle1' noWrap>
              R$ {this.randomizeInt(999)},{this.randomizeInt(9)}{this.randomizeInt(9)}
            </Typography>
          </Grid>

          <Grid item xs={false}>
            <Grid container alignItems='center'>
              <Grid item>
                <Grid container>
                  <EyeIcon className={classes.icon} />
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant='subtitle1'>{this.randomizeInt(9999)}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={false}>
            <Grid container alignItems='center'>
              <Grid item>
                <Grid container>
                  <CursorDefaultIcon className={classes.icon} />
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant='subtitle1'>{this.randomizeInt(9999)} ({this.randomizeInt(100)}%)</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={false}>
            <Grid container alignItems='center'>
              <Grid item>
                <Grid container>
                  <ChartPieIcon className={classes.icon} />
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant='subtitle1'>{this.randomizeInt(100)}%</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={false}>
            <Grid container alignItems='center'>
              <Grid item>
                <ArrowUpIcon className={`${classes.icon} ${classes.greenIcon}`} />
              </Grid>
              <Grid item>
                <Typography variant='subtitle1' color='secondary'>
                  R$ {this.randomizeInt(999)},{this.randomizeInt(9)}{this.randomizeInt(9)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={false}>
            <DropdownMenu options={this.actions} />
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router => <UpsellItem {...props} {...ref} router={router} />}
  </RouterContext.Consumer>
));