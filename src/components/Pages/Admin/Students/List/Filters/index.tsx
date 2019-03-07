import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toast from 'components/Shared/Toast';
import { WithStyles } from 'decorators/withStyles';
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
  classes?: any;
}

interface IState {
  isFiltersOpen: boolean;
  filters: IFiltersModel;
  exportUrl: string;
  formOpened: boolean;
}

@WithStyles(theme => ({
  label: {
    fontSize: 11,
    padding: '0 24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  item: {
    position: 'relative',
    paddingLeft: 15,

    '&::before': {
      content: `''`,
      width: 10,
      height: 10,
      backgroundColor: theme.variables.colors.disabled,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      margin: 'auto',
    },

    '&:first-child': {
      marginTop: 24,
      marginRight: 10,

      '&::before': { backgroundColor: theme.palette.secondary.light, }
    },
  },
}))
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
    const { classes } = this.props;

    return (
      <CardContent>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={true}>
            <Typography variant='subtitle1'>Filtros Ativos:</Typography>
            <Chips />
          </Grid>

          <Grid item xs={12} sm='auto'>
            <Button fullWidth variant='contained' color='primary' onClick={() => this.handleSendEmailOpen()}>
              <EmailIcon color='inherit' />
              Enviar E-mail
            </Button>
          </Grid>

          <Grid item xs={12} sm='auto'>
            <Button disabled={!exportUrl} fullWidth href={exportUrl} target='_blank' variant='contained' color='primary'>
              <ExportIcon color='inherit' />
              Exportar
            </Button>
          </Grid>

          <Grid item xs={12} sm='auto'>
            <Button fullWidth variant='contained' color='secondary' onClick={this.handleOpenFilters}>
              <FilterOutlineIcon color='inherit' />
              Filtros
            </Button>
            <div className={classes.label}>
              <div className={classes.item}>Ativo nos últimos 30 dias</div>
              <div className={classes.item}>Inativo nos últimos 30 dias</div>
            </div>
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