import React, { PureComponent, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { WithStyles } from 'decorators/withStyles';
import FilterOutlineIcon from 'mdi-react/FilterOutlineIcon';
import Chips from './Chips';
import Drawer from './Drawer';

interface IProps {
  classes?: any;
}

interface IState {
  isFiltersOpen: boolean;
}

@WithStyles(theme => ({
  filtersButton: {
    backgroundColor: '#596375',
    color: theme.palette.primary.contrastText,
    fill: theme.palette.primary.contrastText,
  },
}))
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
    const { classes } = this.props;
    const { isFiltersOpen } = this.state;

    return (
      <Fragment>
        <Grid container alignItems='center'>
          <Grid item xs={true}>
            <Grid container direction='column'>
              <Grid item>
                <Typography variant='subtitle1'>
                  Filtros Ativos:
                </Typography>
              </Grid>
              <Grid item>
                <Chips />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={false}>
            <Button variant='contained' className={classes.filtersButton} onClick={this.handleOpenFilters}>
              <FilterOutlineIcon color='inherit' />
              Filtros
          </Button>
          </Grid>
        </Grid>

        <Drawer
          open={isFiltersOpen}
          onClose={this.handleCloseFilter}
        />
      </Fragment>
    );
  }
}