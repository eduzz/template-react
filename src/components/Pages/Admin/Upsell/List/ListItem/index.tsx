import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import nutrorLogo from 'assets/svg/nutror-logo.svg';
import Confirm from 'components/Shared/Confirm';
import DropdownMenu from 'components/Shared/DropdownMenu';
import Toast from 'components/Shared/Toast';
import { IRouteProps, WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import { IUpsellList } from 'interfaces/models/upsell';
import CursorDefaultIcon from 'mdi-react/CursorDefaultIcon';
import EyeIcon from 'mdi-react/EyeIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { PureComponent, SyntheticEvent } from 'react';
import rxjsOperators from 'rxjs-operators';
import upsellService from 'services/upsell';
import { CDN_URL } from 'settings';

interface IProps extends IRouteProps {
  classes?: any;
  upsell: IUpsellList;
  onDelete?: any;
}

@WithRouter()
@WithStyles(theme => ({
  root: {
    border: '1px solid',
    borderColor: theme.variables.contentBorderColor,
    borderRadius: 4,
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  avatar: {
    width: 44,
    height: 44,
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
export default class UpsellItem extends PureComponent<IProps> {
  actions = [{
    text: 'Editar',
    icon: SquareEditOutlineIcon,
    handler: () => this.props.history.push(`/upsell/${this.props.upsell.id}/editar`),
  }, {
    text: 'Excluir',
    icon: TrashCanIcon,
    handler: () => this.handleDelete(),
  }];

  handleDelete = async () => {
    const { upsell, onDelete } = this.props;

    const confirm = await Confirm.show(`Deseja excluir a oferta ${upsell.title}?`);
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

  handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = nutrorLogo;
  }

  randomizeInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

  render() {
    const { upsell, classes } = this.props;

    return (
      <ListItem className={classes.root}>
        <Grid container spacing={16} justify='flex-end' alignItems='center'>
          <Hidden xsDown>
            <Grid item>
              <Grid container>
                <img
                  alt=''
                  className={classes.avatar}
                  src={CDN_URL + upsell.small_image}
                  onError={this.handleImageError}
                  height={44}
                />
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Typography variant='subtitle2' className={classes.title} noWrap>{upsell.title}</Typography>
            </Grid>
          </Hidden>

          <Hidden xsDown>
            <Grid item xs={true}>
              {/* <Typography variant='subtitle1' noWrap>
                R$ {this.randomizeInt(999)},{this.randomizeInt(9)}{this.randomizeInt(9)}
              </Typography> */}
            </Grid>
          </Hidden>

          <Grid item xs={false}>
            <Grid container alignItems='center'>
              <Grid item>
                <Grid container>
                  <EyeIcon className={classes.icon} />
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant='subtitle1'>{upsell.total_view}</Typography>
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
                <Typography variant='subtitle1'>
                  {upsell.total_click} ({((((upsell.total_click / upsell.total_view) || 0) * 100).toFixed(2)).replace('.', ',')}%)
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item xs={false}>
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
          </Grid> */}

          <Hidden smUp>
            <Grid item xs={true} />
          </Hidden>

          <Grid item xs={false}>
            <DropdownMenu options={this.actions} />
          </Grid>

          <Hidden smUp>
            <Grid item xs={12}>
              <Typography variant='subtitle2' className={classes.title} noWrap>{upsell.title}</Typography>
            </Grid>
          </Hidden>
        </Grid>
      </ListItem>
    );
  }
}