import { CircularProgress, TableCell, TableRow } from '@material-ui/core';
import Alert from 'components/Alert';
import DropdownMenu from 'components/DropdownMenu';
import ErrorMessageIcon from 'components/ErrorMessageIcon';
import { IAccessGroup } from 'interfaces/accessGroup';
import { DeleteIcon } from 'mdi-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { cleanAccessGroupDeleteError, requestAccessGroupDelete } from 'store/actionCreators/accessGroup';

interface IProps {
  accessGroup: IAccessGroup;
}

interface IPropsFromConnect {
  requestAccessGroupDelete?: typeof requestAccessGroupDelete;
  cleanAccessGroupDeleteError?: typeof cleanAccessGroupDeleteError;
}

class ListItem extends React.PureComponent<IProps & IPropsFromConnect> {
  async delete() {
    const { accessGroup } = this.props;

    const ok = await Alert.confirm(`Deseja excluir o grupo ${accessGroup.name}?`);
    if (!ok) return;

    this.props.requestAccessGroupDelete(accessGroup);
  }

  render(): JSX.Element {
    const { accessGroup, cleanAccessGroupDeleteError } = this.props;

    return (
      <TableRow>
        <TableCell>{accessGroup.id}</TableCell>
        <TableCell>{accessGroup.name}</TableCell>
        <TableCell>
          {accessGroup.isFetching && <CircularProgress color='secondary' size={20} />}
          {!accessGroup.isFetching && accessGroup.error &&
            <ErrorMessageIcon error={accessGroup.error} onDismiss={() => cleanAccessGroupDeleteError(accessGroup)} />
          }
          {!accessGroup.isFetching && !accessGroup.error &&
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
  requestAccessGroupDelete,
  cleanAccessGroupDeleteError
})(ListItem);