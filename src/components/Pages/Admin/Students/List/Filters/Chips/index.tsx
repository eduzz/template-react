import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { IFiltersModel } from 'interfaces/models/student';
import studentService from 'services/student';
import rxjsOperators from 'rxjs-operators';
import Toast from 'components/Shared/Toast';

interface IProps {

}

interface IState {
  filters: IFiltersModel;
}

export default class Chips extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      filters: studentService.getInitialFilters(),
    };
  }

  componentDidMount() {
    studentService.getFilters().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(filters => {
      this.setState({
        filters,
      });
    }, error => {
      Toast.error(error);
    });
  }

  handleDelete = (identifierLabel: string) => () => {
    studentService.setFilters({
      ...this.state.filters,
      [identifierLabel]: '',
    });
  }

  render() {
    const { filters } = this.state;

    console.log('chips -> ', filters);

    return (
      <Grid container spacing={8}>
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
              label={<Typography variant='subtitle2'>Data Inicial: {filters.last_used_at_start}</Typography>}
              onDelete={this.handleDelete('last_used_at_start')}
            />
          </Grid>
        }
        {!!filters.last_used_at_end &&
          <Grid item>
            <Chip
              label={<Typography variant='subtitle2'>Data final: {filters.last_used_at_end}</Typography>}
              onDelete={this.handleDelete('last_used_at_end')}
            />
          </Grid>
        }
      </Grid>
    );
  }
}