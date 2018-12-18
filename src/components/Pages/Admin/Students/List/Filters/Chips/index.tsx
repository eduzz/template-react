import React, { PureComponent } from 'react';
import { IFiltersModel } from '../';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

interface IProps {
  model: IFiltersModel;
  onDelete: (identifierLabel: string) => (event: any) => void;
}

export default class Chips extends PureComponent<IProps> {
  public refresh = () => {
    this.forceUpdate();
  }

  render() {
    const { model, onDelete } = this.props;

    return (
      <Grid container spacing={8}>
        {!!model.name &&
          <Grid item>
            <Chip
              label={<Typography variant='subtitle2'>Nome: {model.name}</Typography>}
              onDelete={onDelete('name')}
            />
          </Grid>
        }
        {!!model.email &&
          <Grid item>
            <Chip
              label={<Typography variant='subtitle2'>E-mail: {model.email}</Typography>}
              onDelete={onDelete('email')}
            />
          </Grid>
        }
        {!!model.last_used_at_start &&
          <Grid item>
            <Chip
              label={<Typography variant='subtitle2'>Data Inicial: {model.last_used_at_start}</Typography>}
              onDelete={onDelete('last_used_at_start')}
            />
          </Grid>
        }
        {!!model.last_used_at_end &&
          <Grid item>
            <Chip
              label={<Typography variant='subtitle2'>Data final: {model.last_used_at_end}</Typography>}
              onDelete={onDelete('last_used_at_end')}
            />
          </Grid>
        }
      </Grid>
    );
  }
}