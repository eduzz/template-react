import { TableCell, TableRow } from '@material-ui/core';
import ListItemComponent from 'components/Abstract/ListItem';
import { IOption } from 'components/Shared/DropdownMenu';
import DeleteIcon from 'mdi-react/DeleteIcon';
import EditIcon from 'mdi-react/EditIcon';
import * as React from 'react';

interface IProps {
  certificate: ICertificate;
}

export default class ListItem extends ListItemComponent<IProps> {
  private options: IOption[] = [{
    text: 'Editar',
    icon: EditIcon,
    handler: () => null
  }, {
    text: 'Excluir',
    icon: DeleteIcon,
    handler: () => null
  }];

  render(): JSX.Element {
    const { certificate } = this.props;

    return (
      <TableRow>
        <TableCell>{certificate.id}</TableCell>
        <TableCell>{certificate.name}</TableCell>
        <TableCell>
          {this.renderSideMenu(this.options)}
        </TableCell>
      </TableRow>
    );
  }
}