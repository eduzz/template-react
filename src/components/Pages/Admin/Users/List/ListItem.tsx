import { memo, useCallback, useMemo, useState } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { from } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import useCallbackObservable from '@eduzz/houston-hooks/useCallbackObservable';

import DeleteIcon from 'mdi-react/DeleteIcon';
import EditIcon from 'mdi-react/EditIcon';

import Alert from 'components/Shared/Alert';
import { IOption } from 'components/Shared/DropdownMenu';
import TableCellActions from 'components/Shared/Pagination/TableCellActions';
import Toast from 'components/Shared/Toast';
import IUser from 'interfaces/models/user';
import userService from 'services/user';

interface IProps {
  user: IUser;
  onEdit: (user: IUser) => void;
  onDeleteComplete: () => void;
}

const ListItem = memo((props: IProps) => {
  const { user, onEdit, onDeleteComplete } = props;

  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDismissError = useCallback(() => setError(null), []);

  const handleEdit = useCallback(() => {
    onEdit(user);
  }, [onEdit, user]);

  const [handleDelete] = useCallbackObservable(() => {
    return from(Alert.confirm(`Deseja excluir o usuário ${user.firstName}?`)).pipe(
      filter(ok => ok),
      tap(() => setLoading(true)),
      switchMap(() => userService.delete(user.id)),
      tap({
        next: () => {
          Toast.show(`${user.firstName} foi removido`);
          setLoading(true);
          setDeleted(true);
          onDeleteComplete();
        },
        error: error => {
          setLoading(false);
          setError(error);
        }
      })
    );
  }, [onDeleteComplete, user.firstName, user.id]);

  const options = useMemo<IOption[]>(() => {
    return [
      { text: 'Editar', icon: EditIcon, handler: handleEdit },
      { text: 'Excluir', icon: DeleteIcon, handler: handleDelete }
    ];
  }, [handleDelete, handleEdit]);

  if (deleted) {
    return null;
  }

  return (
    <TableRow>
      <TableCell>{user.fullName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCellActions options={options} loading={loading} error={error} onDismissError={handleDismissError} />
    </TableRow>
  );
});

export default ListItem;
