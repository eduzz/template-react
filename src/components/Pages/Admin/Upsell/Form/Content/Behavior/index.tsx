import React, { PureComponent } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { WithStyles } from 'decorators/withStyles';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import Button from '@material-ui/core/Button';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { UpsellFormContext, IUpsellFormContext } from '../../Context';
import authService from 'services/auth';

const vendaNutror = require('assets/images/venda-nutror.png');
const checkout = require('assets/images/checkout.png');
const landing = require('assets/images/landing.png');

interface IProps {
  classes?: any;
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
}))
export default class Behavior extends PureComponent<IProps> {
  static contextType = UpsellFormContext;
  context: IUpsellFormContext;

  componentDidMount() {
    authService.getUser().subscribe(user => {
      console.log(user);
    });
  }

  handleChange = () => {

  }

  handleClick = (type: number) => () => this.context.updateModel(model => model.show_type = type)();

  render() {
    const { classes } = this.props;
    const { model } = this.context;

    return (
      <CardContent>
        <Grid container direction='column' spacing={24}>
          <Grid item>
            <Typography variant='subtitle1'>
              <strong>Comportamentos</strong>
            </Typography>
            <Typography variant='caption'>Aqui podemos definir o fluxo da oferta. Personalize como devem se comportar cada tipo de exibição.</Typography>
          </Grid>
          <Grid item>
            <List disablePadding>
              <ListItem className={classes.item} onClick={this.handleClick(1)}>
                <Grid container spacing={16} wrap='nowrap'>
                  <Grid item className={classes.checkboxContainer}>
                    <CheckCircleIcon className={`${classes.checkbox} ${model.show_type === 1 && classes.selected}`} />
                  </Grid>
                  <Grid item>
                    <img alt='' src={vendaNutror} />
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle1'><strong>Checkout Sun</strong></Typography>
                    <Typography variant='caption'>Direciona o fluxo da venda diretamente para o Checkout Sun.</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem className={classes.item} onClick={this.handleClick(2)}>
                <Grid container spacing={16} wrap='nowrap'>
                  <Grid item className={classes.checkboxContainer}>
                    <CheckCircleIcon className={`${classes.checkbox} ${model.show_type === 2 && classes.selected}`} />
                  </Grid>
                  <Grid item>
                    <img alt='' src={checkout} />
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle1'><strong>Página de Venda Nutror </strong></Typography>
                    <Typography variant='caption'>Na página de Venda do Nutror é exibido o curso em detalhes</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem className={classes.item} onClick={this.handleClick(3)}>
                <Grid container spacing={16} wrap='nowrap'>
                  <Grid item className={classes.checkboxContainer}>
                    <CheckCircleIcon className={`${classes.checkbox} ${model.show_type === 3 && classes.selected}`} />
                  </Grid>
                  <Grid item>
                    <img alt='' src={landing} />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant='subtitle1'><strong>Landing Page Externa</strong></Typography>
                    <Typography variant='caption'>Se você tem uma página de vendas com link da Eduzz pode utilizar para definir o fluxo da venda.</Typography>
                  </Grid>
                  <Grid item xs={true}>
                    <Grid container alignItems='flex-end' wrap='nowrap'>
                      <Grid item>
                        <Typography variant='caption' className={classes.externalLabel}>Link da página</Typography>
                        <FieldText
                          className={classes.externalField}
                          value='abc'
                          onChange={this.handleChange}
                        />
                      </Grid>
                      <Grid item>
                        <Button variant='contained' fullWidth className={classes.button}>ok</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Grid>
          <Grid item>
            <Grid container justify='flex-end'>
              <Grid item>
                <Button variant='contained' type='submit' color='secondary'>
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    );
  }
}