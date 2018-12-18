import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { WithStyles } from 'decorators/withStyles';
import FilterOutlineIcon from 'mdi-react/FilterOutlineIcon';
import Chips from './Chips';
import Drawer from './Drawer';
import { IStateForm, FormComponent } from 'components/Abstract/Form';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';

export interface IFiltersModel {
  name: string;
  email: string;
  last_used_at_start: string;
  last_used_at_end: string;
}

interface IProps {
  classes?: any;
}

interface IState extends IStateForm<IFiltersModel> {
  isFiltersOpen: boolean;
  model: IFiltersModel;
}

@WithStyles(theme => ({
  filtersButton: {
    backgroundColor: '#596375',
    color: theme.palette.primary.contrastText,
    fill: theme.palette.primary.contrastText,
  },
}))
export default class Filters extends FormComponent<IProps, IState> {
  private drawerEl: any;
  private chipsEl: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      isFiltersOpen: false,
      model: {
        name: '',
        email: '',
        last_used_at_start: '',
        last_used_at_end: '',
      },
    };

    this.drawerEl = React.createRef();
    this.chipsEl = React.createRef();
  }

  handleDelete = (identifierLabel: string) => () => {
    this.setState(state => ({
      model: {
        ...state.model,
        [identifierLabel]: '',
      },
    }));
  }

  handleOpenDrawer = () => {
    this.drawerEl.current.open();
  }

  handleSubmitFilters = () => {
    this.drawerEl.current.close();
    this.chipsEl.current.refresh();
  }

  render() {
    const { classes } = this.props;
    const { model } = this.state;

    return (
      <FormValidation onSubmit={this.handleSubmitFilters}>
        <Grid container alignItems='center'>
          <Grid item xs={true}>
            <Grid container direction='column'>
              <Grid item>
                <Typography variant='subtitle1'>
                  Filtros Ativos:
                </Typography>
              </Grid>
              <Grid item>
                <Chips
                  ref={this.chipsEl}
                  model={model}
                  onDelete={this.handleDelete}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={false}>
            <Button variant='contained' className={classes.filtersButton} onClick={this.handleOpenDrawer}>
              <FilterOutlineIcon color='inherit' />
              Filtros
          </Button>
          </Grid>
        </Grid>

        <Drawer
          ref={this.drawerEl}
          model={model}
          updateModel={this.updateModel}
          onSubmit={this.handleSubmitFilters}
        />
      </FormValidation>
    );
  }
}