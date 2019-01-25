import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FilterOutlineIcon from 'mdi-react/FilterOutlineIcon';
import React, { PureComponent } from 'react';

import Chips from './Chips';
import Drawer from './Drawer';

interface IProps {
}

interface IState {
  isFiltersOpen: boolean;
}

export default class Filters extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isFiltersOpen: false,
    };
  }

  handleOpenFilters = () => {
    this.setState({
      isFiltersOpen: true,
    });
  }

  handleCloseFilter = () => {
    this.setState({
      isFiltersOpen: false,
    });
  }

  render() {
    const { isFiltersOpen } = this.state;

    return (
      <CardContent>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={true}>
            <Typography variant='subtitle1'>Filtros Ativos:</Typography>
            <Chips />
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