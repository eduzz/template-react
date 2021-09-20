import { memo, useCallback, useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Toolbar from 'components/Layout/Toolbar';
import IUser from 'interfaces/models/user';
import userService from 'services/user';

import usePromisePaginated from '@eduzz/houston-hooks/usePromisePaginated';
import Button from '@eduzz/houston-ui/Button';
import Table from '@eduzz/houston-ui/Table';

import FormDialog from '../FormDialog';
import ListItem from './ListItem';

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
    retry,
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
      current ? retry() : mergeParams({ term: user.email });
    },
    [current, mergeParams, retry]
  );

  const formCancel = useCallback(() => setFormOpened(false), []);

  return (
    <>
      <Toolbar title='Usuários' />

      <Card>
        <FormDialog opened={formOpened} user={current} onComplete={formCallback} onCancel={formCancel} />

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

        <Table loading={isLoading} sort={params.sort} onSort={handleSort}>
          <Table.Header>
            <Table.Column sortableField='fullName'>Nome</Table.Column>
            <Table.Column sortableField='email'>Email</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Empty count={total} />
            <Table.Error error={error} />
            {result.map((user, index) => (
              <ListItem key={user.id} user={user} index={index} onEdit={handleEdit} onDeleteComplete={retry} />
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
