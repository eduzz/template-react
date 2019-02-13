import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toast from 'components/Shared/Toast';
import { IFiltersModel } from 'interfaces/models/student';
import ExportIcon from 'mdi-react/ExportIcon';
import FilterOutlineIcon from 'mdi-react/FilterOutlineIcon';
import React, { PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

import Chips from './Chips';
import Drawer from './Drawer';

interface IProps {
}

interface IState {
  isFiltersOpen: boolean;
  filters: IFiltersModel;
  exportUrl: string;
}

export default class Filters extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isFiltersOpen: false,
      filters: {},
      exportUrl: '',
    };
  }

  componentDidMount() {
    this.getExportUrl();
  }

  handleOpenFilters = () => {
    this.setState({
      isFiltersOpen: true,
    });
  }

  handleCloseFilter = () => {
    this.getExportUrl();
    this.setState({
      isFiltersOpen: false,
    });
  }

  getExportUrl = () => {
    studentService.getFilters().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(filters => {
      this.setState({ filters });
    }, error => Toast.error(error));

    studentService.getExportStudentsUrl(this.state.filters).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(
      result => this.setState({ ...this.state, exportUrl: result }),
      err => Toast.error(err),
    );
  }

  render() {
    const { isFiltersOpen } = this.state;
    const { exportUrl } = this.state;

    return (
      <CardContent>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={true}>
            <Typography variant='subtitle1'>Filtros Ativos:</Typography>
            <Chips />
          </Grid>

          <Grid item xs={12} sm='auto'>
            <Button fullWidth href={exportUrl} target='_blank' variant='contained' color='primary'>
              <ExportIcon color='inherit' />
              Exportar
            </Button>
          </Grid>

          <Grid item xs={12} sm='auto'>
            <Button fullWidth variant='contained' color='secondary' onClick={this.handleOpenFilters}>
              <FilterOutlineIcon color='inherit' />
              Filtros
            </Button>
          </Grid>
        </Grid>

        <Drawer
          open={isFiltersOpen}
          onClose={this.handleCloseFilter}
        />
      </CardContent>
    );
  }
}