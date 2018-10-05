import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppRouter, { RouterContext } from 'components/Router';
import DropdownMenu from 'components/Shared/DropdownMenu';
import { WithStyles } from 'decorators/withStyles';
import { dateFormat } from 'formatters/date';
import BullhornIcon from 'mdi-react/BullhornIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { PureComponent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { IUpsell } from 'interfaces/models/upsell';

interface IProps {
  classes?: any;
  upsell: IUpsell;
  router?: AppRouter;
}

@WithStyles({
  root: {
    borderTop: 'solid 1px #d5d5d5',
  }
})
class CertificateItem extends PureComponent<IProps> {
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
    // const { certificate } = this.props;

    // const confirm = await Confirm.show(`Deseja excluir o certificado ${certificate.title}?`);
    // if (!confirm) return;

    // certificateService.delete(certificate.id).pipe(
    //   rxjsOperators.loader(),
    //   rxjsOperators.logError(),
    //   rxjsOperators.bindComponent(this)
    // ).subscribe(() => {
    //   Toast.show('Certificado excluído com sucesso');
    // }, err => Toast.error(err));
  }

  render() {
    const { upsell, classes } = this.props;

    return (
      <ListItem className={classes.root}>
        <Grid container spacing={16} alignItems='center'>
          <Grid item xs={false}>
            <BullhornIcon />
          </Grid>

          <Grid item xs={true}>
            <Typography variant='subheading'>{upsell.title}</Typography>
          </Grid>

          <Grid item xs={false}>
            <Typography variant='caption'>Criado em</Typography>
            <Typography variant='caption'>{dateFormat(upsell.created_at, 'dd/MM/yyyy')}</Typography>
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
    {router => <CertificateItem {...props} {...ref} router={router} />}
  </RouterContext.Consumer>
));