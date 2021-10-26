import { memo, useCallback } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

import usePromisePaginated from '@eduzz/houston-hooks/usePromisePaginated';
import Button from '@eduzz/houston-ui/Button';
import Table from '@eduzz/houston-ui/Table';

import ListItem from './ListItem';

import Toolbar from '@/components/Layout/Toolbar';
import IUser from '@/interfaces/models/user';
import userService from '@/services/user';

const CampaignsPage: React.FC = () => {
  const { params, isLoading, total, result, error, retry, handleSort, handleChangePage, handleChangePerPage } =
    usePromisePaginated(
      {
        initialParams: {
          term: '',
          page: 1,
          perPage: 10,
          sort: { field: 'name', direction: 'asc' }
        },
        onChangeParams: params => userService.list(params)
      },
      []
    );

  const handleCreate = useCallback(() => null, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEdit = useCallback((current: IUser) => null, []);

  return (
    <>
      <Toolbar />

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

        <Table loading={isLoading} sort={params.sort} onSort={handleSort}>
          <Table.Header>
            <Table.Column sortableField='fullName'>Nome</Table.Column>
            <Table.Column sortableField='email'>Email</Table.Column>
          </Table.Header>
          <Table.Body>
            {!error && <Table.Empty count={total} />}
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
};

export default memo(CampaignsPage);
