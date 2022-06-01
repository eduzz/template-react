import { memo, useCallback, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

import usePromisePaginated from '@eduzz/houston-hooks/usePromisePaginated';
import Button from '@eduzz/houston-ui/Button';
import Table from '@eduzz/houston-ui/Table';

import FormDialog from '../FormDialog';
import ListItem from './ListItem';

import IUser from '@/interfaces/models/user';
import userService from '@/services/user';

const UserListPage = memo(() => {
  const [formOpened, setFormOpened] = useState(false);
  const [current, setCurrent] = useState<IUser>();

  const {
    params,
    mergeParams,
    isLoading,
    total,
    result,
    error,
    refresh,
    handleSort,
    handleChangePage,
    handleChangePerPage
  } = usePromisePaginated(
    {
      initialParams: {
        term: '',
        page: 1,
        perPage: 10,
        sort: { field: 'fullName', direction: 'asc' }
      },
      onChangeParams: params => userService.list(params)
    },
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
      current ? refresh() : mergeParams({ term: user.email });
    },
    [current, mergeParams, refresh]
  );

  const formCancel = useCallback(() => setFormOpened(false), []);

  return (
    <>
      <FormDialog opened={formOpened} user={current} onComplete={formCallback} onCancel={formCancel} />

      <Card>
        <CardContent>
          <Grid container justifyContent='space-between' alignItems='center' spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
              {/* <SearchField paginationParams={params} onChange={mergeParams} /> */}
            </Grid>

            <Grid item xs={12} sm={'auto'}>
              <Button fullWidth variant='contained' onClick={handleCreate}>
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        <Table stripedRows loading={isLoading} sort={params.sort} onSort={handleSort}>
          <Table.Header>
            <Table.Column sortableField='fullName'>Nome</Table.Column>
            <Table.Column sortableField='email'>Email</Table.Column>
          </Table.Header>
          <Table.Body>
            {!error && <Table.Empty count={total} />}
            <Table.Error error={error} />
            {result.map((user, index) => (
              <ListItem key={user.id} user={user} index={index} onEdit={handleEdit} onDeleteComplete={refresh} />
            ))}
          </Table.Body>
          <Table.Pagination
            total={total}
            page={params.page}
            perPage={params.perPage}
            onChangePage={handleChangePage}
            onChangePerPage={handleChangePerPage}
          />
        </Table>
      </Card>
    </>
  );
});

export default UserListPage;
