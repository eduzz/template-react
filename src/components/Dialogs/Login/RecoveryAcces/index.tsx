import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import { WithStyles } from 'decorators/withStyles';
import React, { MouseEvent } from 'react';

interface IState extends IStateForm<{
  email: string;
}> {
  opened: boolean;
  loading: boolean;
}

interface IProps {
  classes?: any;
  onCancel: (e: MouseEvent<HTMLElement>) => void;
  onComplete: () => void;
}

@WithStyles({
  buttons: {
    justifyContent: 'space-between'
  },
  buttonSubmit: {
    padding: '12px 30px',
    borderRadius: 30,
    boxShadow: 'none',
  },
  buttonOutline: {
    marginTop: 8,
    padding: '8px 22px',
    borderRadius: 50,
    color: '#596375',
    border: '1px solid #596375',
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  title: {
    margin: '0 0 10px',
    display: 'inline-block',
    color: '#596375',
    fontSize: 14,
    fontWeight: 600,
  },
  subtitle: {
    marginBottom: 30,
  },
  footer: {
    textAlign: 'center',
    marginTop: 60,
  },
  paragraph: {
    fontSize: 13,
    lineHeight: '150%',
    fontWeight: 300,
    textAlign: 'center',
  },
  helpLink: {
    fontWeight: 500,
    textDecoration: 'underline',
  }
})
export default class LoginDialogRecoveryAccess extends FormComponent<IProps, IState>  {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, opened: false, loading: false };
  }

  onSubmit = async (isValid: boolean) => {
    if (!isValid) return;

    // const { model } = this.state;
    this.setState({ loading: true });

    // authService.sendResetPassword(model.email).pipe(
    //   RxOp.logError(),
    //   RxOp.bindComponent(this)
    // ).subscribe(() => {
    //   this.setState({ loading: false });
    //   this.resetForm();
    //   this.props.onComplete();

    //   Toast.show('Foi enviado um link para seu email para podermos recuperar seu acesso.');
    // }, err => {
    //   Toast.error(err);
    //   this.setState({ loading: false });
    // });
  }

  render() {
    const { model, loading } = this.state;
    const { classes, onCancel } = this.props;

    return (
      <FormValidation onSubmit={this.onSubmit}>

        <CardContent className={classes.cardContent}>
          <Typography className={classes.title}>Recuperar senha</Typography>
          <Typography className={classes.subtitle}>Iremos lhe enviar um email para recuperar sua senha</Typography>

          <FieldText
            label='Digite o e-mail para recuperar a senha '
            type='email'
            disabled={loading}
            value={model.email}
            validation='required|email'
            onChange={this.updateModel((model, v) => model.email = v)}
          />

        </CardContent>

        <CardActions className={classes.buttons}>
          <Button disabled={loading} className={classes.buttonSubmit} variant='contained' color='secondary' type='submit'>Recuperar senha</Button>
        </CardActions>

        {loading && <LinearProgress color='secondary' />}

        <div className={classes.footer}>
          <Typography className={classes.paragraph}>Já possui uma conta?</Typography>
          <Button className={classes.buttonOutline} disabled={loading} size='small' onClick={onCancel}>Acesse agora</Button>
        </div>

      </FormValidation>
    );
  }
}