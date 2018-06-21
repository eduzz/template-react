import { TableCell, TableRow } from '@material-ui/core';
import ListItemComponent, { IListItemState } from 'components/Abstract/ListItem';
import Alert from 'components/Alert';
import { IAccessGroup } from 'interfaces/accessGroup';
import DeleteIcon from 'mdi-react/DeleteIcon';
import EditIcon from 'mdi-react/EditIcon';
import * as React from 'react';
import rxjsOperators from 'rxjs-operators';
import accessGroupService from 'services/accessGroup';

interface IState extends IListItemState {

}

interface IProps {
  accessGroup: IAccessGroup;
  onEdit: () => void;
  onDelete: () => void;
}

export default class ListItem extends ListItemComponent<IProps, IState> {
  handleDelete = async () => {
    const { accessGroup, onDelete } = this.props;

    const ok = await Alert.confirm(`Deseja excluir o grupo ${accessGroup.name}?`);
    if (!ok) return;

    this.setState({ loading: true });

    accessGroupService.delete(accessGroup).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      onDelete();
    }, error => {
      this.setState({ loading: false, error });
    });
  }

  render(): JSX.Element {
    const { accessGroup } = this.props;

    return (
      <TableRow>
        <TableCell>{accessGroup.id}</TableCell>
        <TableCell>{accessGroup.name}</TableCell>
        <TableCell>
          {this.renderSideMenu([{
            text: 'Editar',
            icon: EditIcon,
            handler: () => { }
          }, {
            text: 'Excluir',
            icon: DeleteIcon,
            handler: this.handleDelete
          }])}
        </TableCell>
      </TableRow>
    );
  }
}