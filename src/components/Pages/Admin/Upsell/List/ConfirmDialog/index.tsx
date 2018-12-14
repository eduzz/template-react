import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { WithStyles } from 'decorators/withStyles';
import CloseIcon from 'mdi-react/CloseIcon';
import IconButton from '@material-ui/core/IconButton';
import { WithRouter } from 'decorators/withRouter';

interface IProps {
  classes?: any;
  match?: any;
  history?: any;
}

interface IState {
  isOpen: boolean;
}

@WithRouter()
@WithStyles(theme => ({
  content: {
    marginTop: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 7,
    paddingRight: theme.spacing.unit * 13,
    paddingLeft: theme.spacing.unit * 13,
  },
  description: {
    maxWidth: 350,
  },
  close: {
    position: 'absolute',
    left: 'calc(100% - 52px)',
    top: 4,
  },
}))
export default class ConfirmDialog extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpen: this.props.match.params.success === 'sucesso',
    };
  }

  handleClose = () => {
    this.props.history.push('/upsell');

    this.setState({
      isOpen: false,
    });
  }

  render() {
    const { classes } = this.props;
    const { isOpen } = this.state;

    return (
      <Dialog open={isOpen} className={classes.root}>
        <IconButton className={classes.close} onClick={this.handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent className={classes.content}>
          <Grid container direction='column' spacing={24} alignItems='center'>
            <Grid item>
              <Typography variant='h4' align='center'>Muito Bem!</Typography>
            </Grid>
            <Grid item className={classes.description}>
              <Typography variant='subtitle1' align='center'>
                A oferta foi criada com sucesso!
                Ela já está sendo exibida para os seus clientes.<br />
                Agora você deve acompanhar os resultados de conversão e otimizar as ofertas.
              </Typography>
            </Grid>
            <Grid item>
              <Button variant='contained' color='secondary' onClick={this.handleClose}>
                Ok, Entendi.
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}