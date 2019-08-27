import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TableCell from '@material-ui/core/TableCell';
import React, { memo } from 'react';

import DropdownMenu, { IOption } from '../DropdownMenu';
import OptionItem from '../DropdownMenu/OptionItem';
import ErrorMessageIcon from '../ErrorMessageIcon';

interface IProps {
  options: IOption[];
  loading?: boolean;
  error?: any;
  onDismissError: () => void;
}

const useStyle = makeStyles({
  td: {
    textAlign: 'right',
    width: 50,
    whiteSpace: 'nowrap'
  },
  loader: {
    padding: 12
  }
});

const TableCellActions = memo<IProps>(props => {
  const classes = useStyle(props);
  const { loading, error, options, onDismissError } = props;

  return (
    <TableCell className={classes.td}>
      {loading && (
        <div className={classes.loader}>
          <CircularProgress color='secondary' size={20} />
        </div>
      )}
      {!loading && error && <ErrorMessageIcon error={error} onDismiss={onDismissError} />}
      {!loading && !error && (
        <DropdownMenu>
          {options.map(o => (
            <OptionItem key={o.text} {...o} />
          ))}
        </DropdownMenu>
      )}
    </TableCell>
  );
});

export default TableCellActions;
