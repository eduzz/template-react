import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toast from 'components/Shared/Toast';
import { dateFormat } from 'formatters/date';
import { IFiltersModel } from 'interfaces/models/student';
import React, { PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

interface IProps {

}

interface IState {
  filters: IFiltersModel;
  totalStudents: number;
}

export default class Chips extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { filters: {}, totalStudents: 0 };
  }

  get isEmpty(): boolean {
    return Object.keys(this.state.filters).filter(k => !!this.state.filters[k]).length === 0;
  }

  componentDidMount() {
    studentService.getFilters().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(filters => {
      this.setState({ filters });
    }, error => Toast.error(error));

    studentService.getTotalStudents().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(totalStudents => {
      this.setState({ totalStudents });
    }, error => Toast.error(error));
  }

  handleDelete = (identifierLabel: string) => () => {
    studentService.setFilters({
      ...this.state.filters,
      [identifierLabel]: '',
    });
  }

  partialTotalStudents = () => {
    const { totalStudents } = this.state;
    const plural = !!totalStudents && totalStudents > 1;

    return (
      <Grid item>
        <Chip label={<Typography variant='subtitle2'>{totalStudents} aluno{!!plural && 's'} encontrado{!!plural && 's'}</Typography>} />
      </Grid>
    );
  }

  render() {
    const { filters, totalStudents } = this.state;

    if (this.isEmpty) {
      return (
        <div>
          <Typography component='em'>Nenhum filtro ativo</Typography>
          {
            !!totalStudents && this.partialTotalStudents()
          }
        </div>
      );
    }

    return (
      <Grid container spacing={8}>
        {
          !!totalStudents && this.partialTotalStudents()
        }
        {!!filters.name &&
          <Grid item>
            <Chip
              label={<Typography variant='subtitle2'>Nome: {filters.name}</Typography>}
              onDelete={this.handleDelete('name')}
            />
          </Grid>
        }
        {!!filters.email &&
          <Grid item>
            <Chip
              label={<Typography variant='subtitle2'>E-mail: {filters.email}</Typography>}
              onDelete={this.handleDelete('email')}
            />
          </Grid>
        }
        {!!filters.last_used_at_start &&
          <Grid item>
            <Chip
              label={<Typography variant='subtitle2'>Data Inicial: {dateFormat(filters.last_used_at_start)}</Typography>}
              onDelete={this.handleDelete('last_used_at_start')}
            />
          </Grid>
        }
        {!!filters.last_used_at_end &&
          <Grid item>
            <Chip
              label={<Typography variant='subtitle2'>Data final: {dateFormat(filters.last_used_at_end)}</Typography>}
              onDelete={this.handleDelete('last_used_at_end')}
            />
          </Grid>
        }
        {!!filters.type && filters.type !== '' &&
          <Grid item>
            <Chip
              label={<Typography variant='subtitle2'>{
                filters.type === 1 ? 'CURSO' : 'PACOTE'}{!!filters.course_name && `: ${filters.course_name}`}
              </Typography>}
              onDelete={this.handleDelete('type')}
            />
          </Grid>
        }
      </Grid>
    );
  }
}