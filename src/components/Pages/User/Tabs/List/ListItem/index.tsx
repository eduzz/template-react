import { TableCell, TableRow } from '@material-ui/core';
import ListItemComponent from 'components/Abstract/ListItem';
import Alert from 'components/Alert';
import { IUser } from 'interfaces/user';
import DeleteIcon from 'mdi-react/DeleteIcon';
import * as React from 'react';
import rxjsOperators from 'rxjs-operators';
import userService from 'services/user';

interface IProps {
  user: IUser;
  onDelete: (user: IUser) => void;
}

export default class ListItem extends ListItemComponent<IProps> {
  async delete() {
    const { user, onDelete } = this.props;

    const isOk = await Alert.confirm(`Deseja excluir o usuário ${user.name}?`);
    if (!isOk) return;

    this.setState({ loading: true });

    userService.delete(user).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      onDelete(user);
    }, error => {
      this.setState({ error, loading: false });
    });
  }

  render(): JSX.Element {
    const { user } = this.props;

    return (
      <TableRow>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.course}</TableCell>
        <TableCell>{user.group}</TableCell>
        <TableCell>
          {this.renderSideMenu([{
            text: 'Excluir',
            icon: DeleteIcon,
            handler: () => this.delete()
          }])}
        </TableCell>
      </TableRow>
    );
  }
}