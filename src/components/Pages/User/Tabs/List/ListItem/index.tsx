import { CircularProgress, TableCell, TableRow } from '@material-ui/core';
import Alert from 'components/Alert';
import DropdownMenu from 'components/DropdownMenu';
import ErrorMessageIcon from 'components/ErrorMessageIcon';
import { IUser } from 'interfaces/user';
import { DeleteIcon } from 'mdi-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { cleanDeleteError, requestUserDelete } from 'store/actionCreators/user';

interface IProps {
  user: IUser;
}

interface IPropsFromConnect {
  requestUserDelete?: typeof requestUserDelete;
  cleanDeleteError?: typeof cleanDeleteError;
}

class ListItem extends React.PureComponent<IProps & IPropsFromConnect> {
  async delete() {
    const { user } = this.props;

    const ok = await Alert.confirm(`Deseja excluir o usuário ${user.name}?`);
    if (!ok) return;

    this.props.requestUserDelete(user);
  }

  render(): JSX.Element {
    const { user, cleanDeleteError } = this.props;

    return (
      <TableRow>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.course}</TableCell>
        <TableCell>{user.group}</TableCell>
        <TableCell>
          {user.isFetching && <CircularProgress color='secondary' size={20} />}
          {!user.isFetching && user.error &&
            <ErrorMessageIcon error={user.error} onDismiss={() => cleanDeleteError(user)} />
          }
          {!user.isFetching && !user.error &&
            <DropdownMenu options={[{
              text: 'Excluir',
              icon: DeleteIcon,
              handler: () => this.delete()
            }]} />
          }
        </TableCell>
      </TableRow>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: IProps) => {
  return {};
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  requestUserDelete,
  cleanDeleteError
})(ListItem);