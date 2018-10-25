import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppRouter, { RouterContext } from 'components/Router';
import Confirm from 'components/Shared/Confirm';
import DropdownMenu from 'components/Shared/DropdownMenu';
import Toast from 'components/Shared/Toast';
import { dateFormat } from 'formatters/date';
import { IAuthor } from 'interfaces/models/author';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { Fragment, PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import authorService from 'services/author';

interface IState {
}

interface IProps {
  classes?: any;
  author: IAuthor;
  router?: AppRouter;
}

class AuthorItem extends PureComponent<IProps, IState> {
  actions = [{
    text: 'Editar',
    icon: SquareEditOutlineIcon,
    handler: () => '',
  }, {
    text: 'Excluir',
    icon: TrashCanIcon,
    handler: () => this.handleDelete(),
  }];

  handleDelete = async () => {
    const { author } = this.props;

    const confirm = await Confirm.show(`Deseja excluir o autor ${author.name}?`);
    if (!confirm) return;

    authorService.delete(author.id).pipe(
      rxjsOperators.loader(),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      Toast.show('Certificado excluído com sucesso');
    }, err => Toast.error(err));
  }

  render() {
    const { author } = this.props;

    return (
      <Fragment>
        <Grid container spacing={16} alignItems='center'>
          <Grid item xs={true}>
            <Typography variant='subtitle1'>{author.name}</Typography>
          </Grid>

          <Grid item xs={false}>
            <Typography variant='caption'>Criado em</Typography>
            <Typography variant='caption'>{dateFormat(author.created_at, 'dd/MM/yyyy')}</Typography>
          </Grid>

          <Grid item xs={false}>
            <DropdownMenu options={this.actions} />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router => <AuthorItem {...props} {...ref} router={router} />}
  </RouterContext.Consumer>
));