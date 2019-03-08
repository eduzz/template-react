import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import MaterialDrawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FieldDate from '@react-form-fields/material-ui/components/Date';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import { WithStyles } from 'decorators/withStyles';
import { ICourseOptions } from 'interfaces/models/course';
import { IFiltersModel } from 'interfaces/models/student';
import CloseIcon from 'mdi-react/CloseIcon';
import React from 'react';
import RxOp from 'rxjs-operators';
import courseService from 'services/course';
import studentService from 'services/student';

interface IProps {
  classes?: any;
  open: boolean;
  onClose?: () => void;
}

interface IState extends IStateForm<IFiltersModel> {
  courses?: ICourseOptions[];
  loadingCourses: boolean;
}

@WithStyles(theme => ({
  iconMenu: {
    marginLeft: '-15px'
  },
  container: {
    height: 'calc(100vh - 70px)'
  },
  form: {
    overflow: 'auto'
  },
  actions: {
    textAlign: 'center'
  }
}))
export default class Drawer extends FormComponent<IProps, IState> {
  today = new Date();

  private filterByOption = [{
    label: 'Curso',
    value: 1,
  }, {
    label: 'Pacote',
    value: 2,
  }];

  constructor(props: IProps) {
    super(props);
    this.state = {
      ...this.state,
      courses: [],
      loadingCourses: false
    };
  }

  componentDidMount() {
    studentService.getFilters().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(filters => {
      this.setState({ model: filters });
    });

    this.getCourses();
  }

  handleSubmitFilters = (isValid: boolean) => {
    if (!isValid) return;

    studentService.setFilters(this.state.model);
    this.props.onClose();
  }

  getCourses = (type?: number) => {
    const types = type ? [type] :
      this.filterByOption.map(option => option.value);

    this.setState({
      ...this.state,
      loadingCourses: true,
    });

    courseService.getCourses(types).pipe(
      RxOp.bindComponent(this),
      RxOp.logError(),
      RxOp.map(courses =>
        (courses || []).map(course => ({
          label: course.title,
          value: course.id,
          type: course.type,
        }))
      ),
    ).subscribe(courses => {
      this.setState({
        ...this.state,
        courses,
        loadingCourses: false,
      });
    });
  }

  render() {
    const { classes, onClose, open } = this.props;
    const { model, courses, loadingCourses } = this.state;

    return (
      <MaterialDrawer anchor='right' open={open} onClose={onClose}>
        <FormValidation onSubmit={this.handleSubmitFilters}>
          <CardContent>
            <Grid container alignItems='center' spacing={16}>
              <Grid item xs={true}>
                <Typography variant='h6' id='title_filtros'>Filtros</Typography>
              </Grid>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Grid>

            <Grid container direction='column' spacing={16} className={classes.container}>
              <Grid item xs={true} className={classes.form}>
                <FieldText
                  value={model.name}
                  placeholder='Filtrar por nome de aluno'
                  label='Nome'
                  validation='min:3'
                  onChange={this.updateModel((model, value) => model.name = value)}
                  id='filterName'
                />

                <FieldText
                  value={model.email}
                  placeholder='Filtrar por e-mail de aluno'
                  label='E-mail'
                  onChange={this.updateModel((model, value) => model.email = value)}
                  id='filterEmail'
                />

                <Grid container spacing={16}>
                  <Grid item xs={6}>
                    <FieldDate
                      label='Período do login'
                      validation='date'
                      placeholder='Inicio'
                      maxDate={this.today}
                      value={model.last_used_at_start}
                      onChange={this.updateModel((model, value) => model.last_used_at_start = value)}
                      id='filterStartDate'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FieldDate
                      label=' '
                      placeholder='Fim'
                      validation='date|after_or_equal:data inicial'
                      validationContext={{ 'data inicial': model.last_used_at_start }}
                      maxDate={this.today}
                      value={model.last_used_at_end}
                      onChange={this.updateModel((model, value) => model.last_used_at_end = value)}
                      id='filterEndDate'
                    />
                  </Grid>
                </Grid>

                <FieldSelect
                  value={model.type}
                  onChange={this.updateModel((model, v) => {
                    model.type = v;
                    this.getCourses(v);
                  })}
                  options={this.filterByOption}
                  label='Filtrar por'
                  emptyOption='Todos'
                />

                {!!model.type &&
                  <FieldSelect
                    loading={loadingCourses}
                    value={model.course_id}
                    onChange={this.updateModel((model, value) => {
                      model.course_id = value;
                      model.course_name = courses.filter(c => c.value === value).map(c => c.label)[0];
                    })}
                    options={courses.filter(course => course.type === model.type)}
                    emptyOption='Todos'
                  />
                }
              </Grid>

              <Grid item xs={false}>
                <Divider />
              </Grid>

              <Grid item xs={false} className={classes.actions}>
                <Button variant='contained' type='submit' color='secondary' id='btn_aplicarFiltros'>
                  Aplicar Filtros
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </FormValidation>
      </MaterialDrawer>
    );
  }
}