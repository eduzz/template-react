import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ListItemComponent, { IStateListItem } from 'components/Abstract/ListItem';
import Alert from 'components/Shared/Alert';
import { IOption } from 'components/Shared/DropdownMenu';
import Toast from 'components/Shared/Toast';
import IUser from 'interfaces/models/user';
import DeleteIcon from 'mdi-react/DeleteIcon';
import EditIcon from 'mdi-react/EditIcon';
import * as React from 'react';
import * as RxOp from 'rxjs-operators';
import userService from 'services/user';

interface IState extends IStateListItem {
  deleted?: boolean;
}

interface IProps {
  user: IUser;
  onEdit: (user: IUser) => void;
  onDeleteComplete: () => void;
}

export default class ListItem extends ListItemComponent<IProps, IState> {
  private readonly options: IOption[];

  constructor(props: IProps) {
    super(props);
    this.options = [
      {
        text: 'Editar',
        icon: EditIcon,
        handler: this.handleEdit
      },
      {
        text: 'Excluir',
        icon: DeleteIcon,
        handler: this.handleDelete
      }
    ];
  }

  handleEdit = () => {
    const { user, onEdit } = this.props;
    onEdit(user);
  };

  handleDelete = async () => {
    const { user, onDeleteComplete } = this.props;

    const ok = await Alert.confirm(`Deseja excluir o usuário ${user.firstName}?`);
    if (!ok) return;

    this.setState({ loading: true });

    userService
      .delete(user.id)
      .pipe(
        RxOp.logError(),
        RxOp.bindComponent(this)
      )
      .subscribe(
        () => {
          Toast.show(`${user.firstName} foi removido`);
          this.setState({ loading: false, deleted: true });
          onDeleteComplete();
        },
        error => {
          this.setState({ loading: false, error });
        }
      );
  };

  render(): JSX.Element {
    const { deleted } = this.state;
    const { user } = this.props;

    if (deleted) {
      return null;
    }

    return (
      <TableRow>
        <TableCell>{user.fullName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{this.renderSideMenu(this.options)}</TableCell>
      </TableRow>
    );
  }
}
