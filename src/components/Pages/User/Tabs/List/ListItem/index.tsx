import { TableCell, TableRow } from '@material-ui/core';
import ListItemComponent from 'components/Abstract/ListItem';
import Alert from 'components/Alert';
import { IUser } from 'interfaces/user';
import DeleteIcon from 'mdi-react/DeleteIcon';
import * as React from 'react';

interface IProps {
  user: IUser;
}

export default class ListItem extends ListItemComponent<IProps> {
  async delete() {
    const { user } = this.props;

    const ok = await Alert.confirm(`Deseja excluir o usuário ${user.name}?`);
    if (!ok) return;

    // this.props.requestUserDelete(user);
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