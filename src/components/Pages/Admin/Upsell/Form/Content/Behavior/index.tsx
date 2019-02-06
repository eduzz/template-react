import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import FieldText from '@react-form-fields/material-ui/components/Text';
import checkout from 'assets/images/checkout.png';
import landing from 'assets/images/landing.png';
import vendaNutror from 'assets/images/venda-nutror.png';
import { WithStyles } from 'decorators/withStyles';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import React, { PureComponent } from 'react';
import RxOp from 'rxjs-operators';
import authService from 'services/auth';
import upsellService from 'services/upsell';

import { IUpsellFormContext, UpsellFormContext } from '../../Context';

interface IBeta {
  content: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  type: number;
  cpfcnpj: string;
  id_leg: number;
  clicodeduzz: string;
  beta: IBeta[];
}

interface IProps {
  classes?: any;
}

interface IState {
  user: IUser;
  courses: any;
}

@WithStyles(theme => ({
  item: {
    border: '1px solid',
    borderRadius: 4,
    borderColor: theme.variables.contentBorderColor,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    cursor: 'pointer',
  },
  checkboxContainer: {
    padding: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    '&:before': {
      content: '""',
      width: 13,
      height: 13,
      position: 'absolute',
      backgroundColor: theme.palette.primary.contrastText,
      top: 5,
      left: 5,
    },
  },
  checkbox: {
    transition: 'all 0.3s ease',
    fill: '#D9D9D9',
  },
  externalField: {
    width: 285,
    maxWidth: '100%',
    margin: 0,
  },
  externalLabel: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: -theme.spacing.unit * 3,
  },
  button: {
    backgroundColor: '#596375',
    color: theme.palette.primary.contrastText,
    width: 45,
    height: 45,
    padding: 0,
  },
  selected: {
    fill: '#009358',
  },
  fieldSelectContainer: {
    position: 'relative',
  },
  fieldSelectLoading: {
    position: 'absolute',
    width: '100%',
    top: 76,
    zIndex: 10,
    borderRadius: '0 0 4px 4px',
  },
}))
export default class Behavior extends PureComponent<IProps, IState> {
  static contextType = UpsellFormContext;
  context: IUpsellFormContext;

  constructor(props: IProps) {
    super(props);

    this.state = {
      user: null,
      courses: [],
    };
  }

  componentDidMount() {
    authService.getUserInfo().pipe(
      RxOp.bindComponent(this),
      RxOp.logError(),
    ).subscribe(user => {
      this.setState({
        user,
      });
    });

    upsellService.getCourses().pipe(
      RxOp.bindComponent(this),
      RxOp.logError(),
      RxOp.map(courses =>
        (courses || []).map(course => ({
          label: course.title,
          value: course.hash,
        }))
      ),
    ).subscribe(courses => {
      this.setState({
        courses,
      });
    });
  }

  handleChange = (url: string) => {
    this.context.updateModel(model => model.external_url = url)();
  }

  handleClick = (type: number) => () => this.context.updateModel(model => model.show_type = type)();

  handleBack = () => this.context.updateFlowStep(this.context.flowStep - 1);

  render() {
    const { classes } = this.props;
    const { model, updateModel } = this.context;
    const { user, courses } = this.state;

    return (
      <Card>
        <CardContent>
          <Grid container direction='column' spacing={24}>
            <Grid item>
              <Typography id='txtComportamentos' variant='subtitle1'>
                <strong>Comportamentos</strong>
              </Typography>
              <Typography variant='caption'>
                Aqui podemos definir o fluxo da oferta. Personalize como devem se comportar cada tipo de exibição.
              </Typography>
            </Grid>
            <Grid item>
              <List disablePadding>
                <ListItem id='CheckoutSun' className={classes.item} onClick={this.handleClick(1)}>
                  <Grid container spacing={16}>
                    <Grid item className={classes.checkboxContainer}>
                      <CheckCircleIcon className={`${classes.checkbox} ${model.show_type === 1 && classes.selected}`} />
                    </Grid>
                    <Grid item>
                      <img alt='' src={vendaNutror} />
                    </Grid>
                    <Grid item xs={true}>
                      <Typography variant='subtitle1'><strong>Checkout Sun</strong></Typography>
                      <Typography variant='caption'>Direciona o fluxo da venda diretamente para o Checkout Sun.</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem id='PaginaInterna' className={classes.item} onClick={this.handleClick(2)}>
                  <Grid container spacing={16}>
                    <Grid item className={classes.checkboxContainer}>
                      <CheckCircleIcon className={`${classes.checkbox} ${model.show_type === 2 && classes.selected}`} />
                    </Grid>
                    <Grid item>
                      <img alt='' src={checkout} />
                    </Grid>
                    <Grid item xs={true}>
                      <Typography variant='subtitle1'><strong>Página de Venda Nutror </strong></Typography>
                      <Typography variant='caption'>Na página de Venda do Nutror é exibido o curso em detalhes</Typography>

                      <FieldSelect
                        label='Curso a ser exibido'
                        className={classes.externalField}
                        value={model.course_hash}
                        validation={model.show_type === 2 ? 'required' : null}
                        onChange={updateModel((model, v) => model.course_hash = v)}
                        options={courses}
                        loading={!courses.length}
                        disabled={!courses.length}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                {!!user && user.beta.some(b => b.content === 'upsell') &&
                  <ListItem id='PaginaExterna' className={classes.item} onClick={this.handleClick(3)}>
                    <Grid container spacing={16}>
                      <Grid item className={classes.checkboxContainer}>
                        <CheckCircleIcon className={`${classes.checkbox} ${model.show_type === 3 && classes.selected}`} />
                      </Grid>
                      <Grid item>
                        <img alt='' src={landing} />
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant='subtitle1'><strong>Landing Page Externa</strong></Typography>
                        <Typography variant='caption'>
                          Se você tem uma página de vendas com link da Eduzz pode utilizar para definir o fluxo da venda.
                      </Typography>
                      </Grid>
                      <Grid item xs={true}>
                        <Grid container alignItems='flex-end' wrap='nowrap'>
                          <Grid item>
                            <Typography variant='caption' className={classes.externalLabel}>Link da página</Typography>
                            <FieldText
                              className={classes.externalField}
                              value={model.external_url}
                              onChange={this.handleChange}
                              validation={model.show_type === 3 ? 'required' : null}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ListItem>
                }
              </List>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item xs={true}>
                  <Button variant='outlined' color='secondary' onClick={this.handleBack}>
                    Anterior
                  </Button>
                </Grid>
                <Grid item>
                  <Button id='Salvar' variant='contained' type='submit' color='secondary'>
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}