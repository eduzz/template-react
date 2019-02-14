import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ListItemComponent, { IStateListItem } from 'components/Abstract/ListItem';
import Avatar from 'components/Shared/Avatar';
import Confirm from 'components/Shared/Confirm';
import { IOption } from 'components/Shared/DropdownMenu';
import Toast from 'components/Shared/Toast';
import { dateFormat } from 'formatters/date';
import { IAuthor } from 'interfaces/models/author';
import DeleteIcon from 'mdi-react/DeleteIcon';
import EditIcon from 'mdi-react/EditIcon';
import React from 'react';
import RxOp from 'rxjs-operators';
import authorService from 'services/author';

interface IState extends IStateListItem {
}

interface IProps {
  author: IAuthor;
  onEdit: (author: IAuthor) => void;
}

export default class AuthorItem extends ListItemComponent<IProps, IState> {
  private readonly options: IOption[];

  constructor(props: IProps) {
    super(props);
    this.options = [{
      text: 'Editar',
      icon: EditIcon,
      handler: this.handleEdit,
    }, {
      text: 'Excluir',
      icon: DeleteIcon,
      handler: this.handleDelete,
    }];
  }

  handleEdit = () => {
    const { author, onEdit } = this.props;
    onEdit(author);
  }

  handleDelete = async () => {
    const { author } = this.props;

    const confirm = await Confirm.show(`Deseja excluir o autor ${author.name}?`);
    if (!confirm) return;

    this.setState({ loading: true });

    authorService.delete(author.id).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(() => {
      Toast.show('Autor excluído com sucesso');
    }, err => this.setError(err));
  }

  render() {
    const { author } = this.props;

    return (
      <TableRow>
        <TableCell>
          <Avatar
            src={author.avatar}
            text={author.name}
          />
        </TableCell>
        <TableCell>{author.name}</TableCell>
        <TableCell>{dateFormat(author.created_at, 'dd/MM/yyyy')}</TableCell>
        <TableCell className='actions'>
          {this.renderSideMenu(this.options)}
        </TableCell>
      </TableRow>
    );
  }
}