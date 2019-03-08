import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toast from 'components/Shared/Toast';
import { IFiltersModel } from 'interfaces/models/student';
import EmailIcon from 'mdi-react/EmailIcon';
import ExportIcon from 'mdi-react/ExportIcon';
import FilterOutlineIcon from 'mdi-react/FilterOutlineIcon';
import React, { PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

import Chips from './Chips';
import Drawer from './Drawer';
import SendEmailDialog from './SendEmailDialog';

interface IProps {
}

interface IState {
  isFiltersOpen: boolean;
  filters: IFiltersModel;
  exportUrl: string;
  formOpened: boolean;
}

export default class Filters extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isFiltersOpen: false,
      filters: {},
      exportUrl: '',
      formOpened: false,
    };
  }

  componentDidMount() {
    this.getExportUrl();
  }

  handleOpenFilters = () => {
    this.setState({ isFiltersOpen: true, });
  }

  handleCloseFilter = () => {
    this.getExportUrl();
    this.setState({ isFiltersOpen: false, });
  }

  handleSendEmailOpen = () => {
    this.setState({ formOpened: true });
  }

  handleSendEmailCallback = () => {
    this.setState({ formOpened: false });
  }

  handleSendEmailCancel = () => {
    this.setState({ formOpened: false });
  }

  getExportUrl = () => {
    studentService.getFilters().pipe(
      RxOp.switchMap(filters => studentService.getExportStudentsUrl(filters)),
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(
      exportUrl => this.setState({ ...this.state, exportUrl }),
      error => Toast.error(error),
    );
  }

  render() {
    const { isFiltersOpen, exportUrl, formOpened } = this.state;

    return (
      <CardContent>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={true}>
            <Typography variant='subtitle1' id='title_filtrosAtivos'>Filtros Ativos:</Typography>
            <Chips />
          </Grid>

          <Grid item xs={12} sm='auto'>
            <Button fullWidth variant='contained' color='primary' onClick={() => this.handleSendEmailOpen()} id='btn_enviaEmail'>
              <EmailIcon color='inherit' />
              Enviar E-mail
            </Button>
          </Grid>

          <Grid item xs={12} sm='auto'>
            <Button disabled={!exportUrl} fullWidth href={exportUrl} target='_blank' variant='contained' color='primary' id='btn_exportar'>
              <ExportIcon color='inherit' />
              Exportar
            </Button>
          </Grid>

          <Grid item xs={12} sm='auto'>
            <Button fullWidth variant='contained' color='secondary' onClick={this.handleOpenFilters} id='btn_filtros'>
              <FilterOutlineIcon color='inherit' />
              Filtros
            </Button>
          </Grid>
        </Grid>

        <Drawer
          open={isFiltersOpen}
          onClose={this.handleCloseFilter}
        />

        <SendEmailDialog
          opened={formOpened}
          onComplete={this.handleSendEmailCallback}
          onCancel={this.handleSendEmailCancel}
        />
      </CardContent>
    );
  }
}