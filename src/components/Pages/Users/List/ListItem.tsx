import { memo, useCallback, useState } from 'react';

import EditOutline from '@eduzz/houston-icons/EditOutline';
import TrashOutline from '@eduzz/houston-icons/TrashOutline';
import Table from '@eduzz/houston-ui/Table';
import Toast from '@eduzz/houston-ui/Toast';

import Alert from '@/components/Globals/Alert';
import { User } from '@/schemas/user';
import userService from '@/services/user';

interface IProps {
  user: User;
  index: number;
  onEdit: (user: User) => void;
  onDeleteComplete: () => void;
}

const ListItem = memo((props: IProps) => {
  const { user, onEdit, onDeleteComplete, index } = props;

  const [deleted, setDeleted] = useState(false);

  const handleEdit = useCallback(() => {
    onEdit(user);
  }, [onEdit, user]);

  const handleDelete = useCallback(async () => {
    const confirm = await Alert.confirm(`Deseja excluir o usuário ${user.name}?`);
    if (!confirm) return;

    setDeleted(true);

    try {
      await userService.delete(user.id as number);
      onDeleteComplete();
    } catch (err) {
      Toast.error(`Não foi possível excluir o usuário ${user.name}?`);
      setDeleted(false);
    }
  }, [onDeleteComplete, user.name, user.id]);

  if (deleted) {
    return null;
  }

  return (
    <Table.Row data={user} index={index}>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Action icon={<EditOutline />} onClick={handleEdit}>
        Editar
      </Table.Action>
      <Table.Action icon={<TrashOutline />} onClick={handleDelete}>
        Excluir
      </Table.Action>
    </Table.Row>
  );
});

export default ListItem;
