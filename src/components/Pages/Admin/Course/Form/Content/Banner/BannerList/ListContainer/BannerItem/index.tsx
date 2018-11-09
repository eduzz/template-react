import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import DropdownMenu from 'components/Shared/DropdownMenu';
import { WithStyles } from 'decorators/withStyles';
import { IBanner } from 'interfaces/models/banner';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { PureComponent } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { CDN_URL } from 'settings';

import DragHandle from '../../DragHandle';

interface IProps {
  classes?: any;
  banner: IBanner;
  onDelete?: any;
}

@WithStyles({
  root: {
    borderTop: 'solid 1px #d5d5d5',
  },
  imgThumb: {
    maxWidth: 100,
    maxHeight: 100,
  }
})
class BannerItem extends PureComponent<IProps> {
  actions = [{
    text: 'Editar',
    icon: SquareEditOutlineIcon,
    handler: () => console.log(1),
  }, {
    text: 'Excluir',
    icon: TrashCanIcon,
    handler: () => this.handleDelete(),
  }];

  handleDelete = async () => {
    /* const { banner, onDelete } = this.props;

    const confirm = await Confirm.show(`Deseja excluir o certificado ${banner.title}?`);
    if (!confirm) return;

    bannerService.delete(banner.id).pipe(
      rxjsOperators.loader(),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      Toast.show('Certificado excluído com sucesso');

      onDelete && onDelete(banner.id);
    }, (err: any) => Toast.error(err)); */
  }

  render() {
    const { banner, classes } = this.props;

    return (
      <ListItem className={classes.root}>
        <Grid container spacing={16} alignItems='center'>
          <Grid item xs={false}>
            <DragHandle />
          </Grid>

          <Grid item xs={true}>
            <img className={classes.imgThumb} src={CDN_URL + banner.img} />
          </Grid>

          <Grid item xs={false}>
            <DropdownMenu options={this.actions} />
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}

export default SortableElement(BannerItem);