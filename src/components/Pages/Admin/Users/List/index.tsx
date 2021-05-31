import { Fragment, memo, useCallback, useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import usePaginatedObservable from '@eduzz/houston-hooks/usePaginatedObservable';
import Button from '@eduzz/houston-ui/Button';

import RefreshIcon from 'mdi-react/RefreshIcon';

import Toolbar from 'components/Layout/Toolbar';
import CardLoader from 'components/Shared/CardLoader';
import EmptyAndErrorMessages from 'components/Shared/Pagination/EmptyAndErrorMessages';
import SearchField from 'components/Shared/Pagination/SearchField';
import TableCellActions from 'components/Shared/Pagination/TableCellActions';
import TableCellSortable from 'components/Shared/Pagination/TableCellSortable';
import TablePagination from 'components/Shared/Pagination/TablePagination';
import IUser from 'interfaces/models/user';
import userService from 'services/user';

import FormDialog from '../FormDialog';
import ListItem from './ListItem';

const UserListPage = memo(() => {
  const [formOpened, setFormOpened] = useState(false);
  const [current, setCurrent] = useState<IUser>();

  const { params, mergeParams, isLoading, total, result, error, retry } = usePaginatedObservable(
    params => userService.list(params),
    { orderBy: 'fullName', orderDirection: 'asc' },
    []
  );

  const handleCreate = useCallback(() => {
    setCurrent(null);
    setFormOpened(true);
  }, []);

  const handleEdit = useCallback((current: IUser) => {
    setCurrent(current);
    setFormOpened(true);
  }, []);

  const formCallback = useCallback(
    (user?: IUser) => {
      setFormOpened(false);
      current ? retry() : mergeParams({ term: user.email });
    },
    [current, mergeParams, retry]
  );

  const formCancel = useCallback(() => setFormOpened(false), []);
  const handleRefresh = useCallback(() => retry(), [retry]);

  return (
    <Fragment>
      <Toolbar title='Usuários' />

      <Card>
        <FormDialog opened={formOpened} user={current} onComplete={formCallback} onCancel={formCancel} />

        <CardLoader show={isLoading} />

        <CardContent>
          <Grid container justify='space-between' alignItems='center' spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
              <SearchField paginationParams={params} onChange={mergeParams} />
            </Grid>

            <Grid item xs={12} sm={'auto'}>
              <Button fullWidth variant='contained' onClick={handleCreate}>
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        <Table>
          <TableHead>
            <TableRow>
              <TableCellSortable
                paginationParams={params}
                disabled={isLoading}
                onChange={mergeParams}
                column='fullName'
              >
                Nome
              </TableCellSortable>
              <TableCellSortable paginationParams={params} disabled={isLoading} onChange={mergeParams} column='email'>
                Email
              </TableCellSortable>
              <TableCellActions>
                <IconButton disabled={isLoading} onClick={handleRefresh}>
                  <RefreshIcon />
                </IconButton>
              </TableCellActions>
            </TableRow>
          </TableHead>
          <TableBody>
            <EmptyAndErrorMessages
              colSpan={3}
              error={error}
              loading={isLoading}
              hasData={result.length > 0}
              onTryAgain={retry}
            />
            {result.map(user => (
              <ListItem key={user.id} user={user} onEdit={handleEdit} onDeleteComplete={retry} />
            ))}
          </TableBody>
        </Table>

        <TablePagination total={total} disabled={isLoading} paginationParams={params} onChange={mergeParams} />
      </Card>
    </Fragment>
  );
});

export default UserListPage;
