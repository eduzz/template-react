import Button from '@material-ui/core/Button';
import MaterialDrawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FieldText } from '@react-form-fields/material-ui';
import FieldDate from '@react-form-fields/material-ui/components/Date';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import { WithStyles } from 'decorators/withStyles';
import { IFiltersModel } from 'interfaces/models/student';
import React from 'react';
import rxjsOperators from 'rxjs-operators';
import studentService from 'services/student';

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
    top: 'calc(100% - 37px)',
    margin: 0,
  },
}))
export default class Drawer extends FormComponent<IProps, IState> {
  today = new Date();

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
                  label='Nome'
                  validation='min:3'
                  onChange={this.updateModel((model, value) => model.name = value)}
                />
              </Grid>
              <Grid item>
                <FieldText
                  value={model.email}
                  placeholder='Filtrar por e-mail de aluno'
                  validation='email'
                  label='E-mail'
                  onChange={this.updateModel((model, value) => model.email = value)}
                />
              </Grid>
            </Grid>
            <Grid container direction='column' wrap='nowrap' className={classes.filtersContainer}>
              <Grid item>
                <Typography variant='subtitle1'>Período do login</Typography>
                <Grid container spacing={16}>
                  <Grid item xs={6}>
                    <FieldDate
                      label='Data Inicial'
                      validation='date'
                      maxDate={this.today}
                      value={model.last_used_at_start}
                      onChange={this.updateModel((model, value) => model.last_used_at_start = value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FieldDate
                      label='Data Final'
                      validation='date|after_or_equal:data inicial'
                      validationContext={{ 'data inicial': model.last_used_at_start }}
                      maxDate={this.today}
                      value={model.last_used_at_end}
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