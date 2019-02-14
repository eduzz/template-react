import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { IStateList, ListComponent, TableCellSortable } from 'components/Abstract/List';
import Toolbar from 'components/Layout/Toolbar';
import TableWrapper from 'components/Shared/TableWrapper';
import { WithStyles } from 'decorators/withStyles';
import { IAuthor } from 'interfaces/models/author';
import { IPaginationParams } from 'interfaces/pagination';
import PlusIcon from 'mdi-react/PlusIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';
import React, { Fragment } from 'react';
import RxOp from 'rxjs-operators';
import authorService from 'services/author';

import AuthorFormDialog from './Dialog';
import ListItem from './ListItem';

interface IState extends IStateList {
  authors?: IAuthor[];
  current?: IAuthor;
  error?: any;
  formOpened: boolean;
}

interface IProps {
  classes?: any;
}

@WithStyles({
  loader: {
    textAlign: 'center'
  },
  card: {
    minHeight: 'fit-content',
  },
})
export default class AuthorIndexPage extends ListComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props, 'title', 'asc');
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = (params: Partial<IPaginationParams> = {}) => {
    this.setState({ error: null, authors: null, loading: true });

    authorService.list(this.mergeParams(params)).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(result => {
      if (result.updating) {
        this.setState({ loading: result.updating });
        return;
      }

      this.setPaginatedData(result.data);
    }, error => this.setError(error));
  }

  handleCreate = () => {
    this.setState({ formOpened: true, current: null });
  }

  handleEdit = (current: IAuthor) => {
    this.setState({ formOpened: true, current });
  }

  handleFormCallback = () => {
    this.setState({ formOpened: false });
    this.loadData();
  }

  handleFormCancel = () => {
    this.setState({ formOpened: false });
  }

  render() {
    const { formOpened, loading, items, current } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={true}>
              <Typography variant='h6' noWrap>Autores</Typography>
            </Grid>

            <Grid item xs={false}>
              <Button variant='contained' size='small' color='secondary' onClick={this.handleCreate}><PlusIcon />
                <Hidden xsDown>Criar novo autor</Hidden>
                <Hidden smUp>Criar autor</Hidden>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>

        <AuthorFormDialog
          opened={formOpened}
          author={current}
          onComplete={this.handleFormCallback}
          onCancel={this.handleFormCancel}
        />

        <Card className={classes.card}>
          {this.renderLoader()}

          <CardContent>
            <Grid container>
              <Grid item xs={12} sm={6} lg={4}>
                {this.renderSearch()}
              </Grid>
            </Grid>
          </CardContent>

          <TableWrapper minWidth={500}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 50 }} />
                  <TableCellSortable {...this.sortableProps} column='title'>
                    Nome
                  </TableCellSortable>
                  <TableCellSortable {...this.sortableProps} column='created_at'>
                    Data de criação
                  </TableCellSortable>
                  <TableCell className='actions'>
                    <IconButton disabled={loading} onClick={this.handleRefresh}>
                      <RefreshIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.renderEmptyAndErrorMessages(4)}
                {items.map(author =>
                  <ListItem
                    key={author.id}
                    author={author}
                    onEdit={this.handleEdit}
                  />
                )}
              </TableBody>
            </Table>
          </TableWrapper>
          {this.renderTablePagination()}
        </Card>
      </Fragment>
    );
  }
}