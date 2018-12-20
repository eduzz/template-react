import React from 'react';
import Grid from '@material-ui/core/Grid';
import MaterialDrawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import { FieldText } from '@react-form-fields/material-ui';
import Button from '@material-ui/core/Button';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import studentService from 'services/student';
import { IFiltersModel } from 'interfaces/models/student';
import rxjsOperators from 'rxjs-operators';

interface IProps {
  classes?: any;
  open: boolean;
  onClose?: () => void;
}

interface IState extends IStateForm<IFiltersModel> {
  model: IFiltersModel;
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
export default class Drawer extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      model: studentService.getInitialFilters(),
    };
  }

  componentDidMount() {
    studentService.getFilters().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(filters => {
      this.setState({
        model: filters,
      });
    });
  }

  handleSubmitFilters = (isValid: boolean) => {
    if (!isValid) return;

    this.props.onClose();

    studentService.setFilters(this.state.model);
  }

  render() {
    const { classes, onClose, open } = this.props;
    const { model } = this.state;

    return (
      <MaterialDrawer anchor='right' open={open} onClose={onClose}>
        <FormValidation onSubmit={this.handleSubmitFilters}>
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
                  validation='min:3'
                  onChange={this.updateModel((model, value) => model.name = value)}
                />
              </Grid>
              <Grid item>
                <FieldText
                  value={model.email}
                  placeholder='Filtrar por e-mail de aluno'
                  fullWidth
                  validation='email'
                  label='E-mail'
                  onChange={this.updateModel((model, value) => model.email = value)}
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
                      onChange={this.updateModel((model, value) => model.last_used_at_start = value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FieldText
                      value={model.last_used_at_end}
                      fullWidth
                      type='date'
                      label='Data Final'
                      onChange={this.updateModel((model, value) => model.last_used_at_end = value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button variant='contained' type='submit' color='secondary' className={classes.saveFiltersButton}>
              Aplicar Filtros
            </Button>
          </div>
        </FormValidation>
      </MaterialDrawer>
    );
  }
}