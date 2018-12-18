import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialDrawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import { FieldText } from '@react-form-fields/material-ui';
import Button from '@material-ui/core/Button';
import { IFiltersModel } from '..';

interface IProps {
  model: IFiltersModel;
  updateModel: (handler: (model: IFiltersModel, value: any) => void) => (value: any) => void;
  classes?: any;
  onSubmit: () => void;
}

interface IState {
  isFiltersOpen: boolean;
}

@WithStyles(theme => ({
  drawerContainer: {
    overflow: 'hidden',
    width: 300,
  },
  filtersContainer: {
    padding: theme.spacing.unit * 2,
    maxHeight: 'calc(100vh - 22px)',
    overflowX: 'auto',
  },
  saveFiltersButton: {
    width: '100%',
    borderRadius: 0,
    position: 'absolute',
    top: 'calc(100% - 38px)',
    margin: 0,
  },
}))
export default class Drawer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isFiltersOpen: false,
    };
  }

  public open = () => {
    this.setState({
      isFiltersOpen: true,
    });
  }

  public close = () => {
    this.setState({
      isFiltersOpen: false,
    });
  }

  render() {
    const { classes, model, updateModel, onSubmit } = this.props;
    const { isFiltersOpen } = this.state;

    return (
      <MaterialDrawer anchor='right' open={isFiltersOpen} onClose={this.close}>
        <div className={classes.drawerContainer}>
          <Grid container direction='column' wrap='nowrap' className={classes.filtersContainer}>
            <Grid item>
              <Typography variant='subtitle1' gutterBottom>
                <strong>Filtros</strong>
              </Typography>
            </Grid>
            <Grid item>
              <FieldText
                value={model.name}
                placeholder='Filtrar por nome de aluno'
                fullWidth
                label='Nome'
                onChange={updateModel((model, value) => model.name = value)}
              />
            </Grid>
            <Grid item>
              <FieldText
                value={model.email}
                placeholder='Filtrar por e-mail de aluno'
                fullWidth
                label='E-mail'
                onChange={updateModel((model, value) => model.email = value)}
              />
            </Grid>
            <Grid item>
              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <FieldText
                    value={model.last_used_at_start}
                    fullWidth
                    type='date'
                    label='Data Inicial'
                    onChange={updateModel((model, value) => model.last_used_at_start = value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FieldText
                    value={model.last_used_at_end}
                    fullWidth
                    type='date'
                    label='Data Final'
                    onChange={updateModel((model, value) => model.last_used_at_end = value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button variant='contained' onClick={onSubmit} color='secondary' className={classes.saveFiltersButton}>
            Aplicar Filtros
          </Button>
        </div>
      </MaterialDrawer>
    );
  }
}