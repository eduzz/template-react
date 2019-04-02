import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toast from 'components/Shared/Toast';
import { WithStyles } from 'decorators/withStyles';
import React, { MouseEvent } from 'react';
import RxOp from 'rxjs-operators';
import authService from 'services/auth';

interface IState extends IStateForm<{
  username: string;
  password: string;
}> {
  opened: boolean;
  loading: boolean;
}

interface IProps {
  classes?: any;
  onRecoveryAccess: (e: MouseEvent<HTMLElement>) => void;
}

@WithStyles(theme => ({
  buttons: {
    justifyContent: 'space-between',
    padding: '8px 12px',
  },
  buttonSubmit: {
    padding: '12px 30px',
    borderRadius: 30,
    boxShadow: 'none',
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  passContainer: {
    position: 'relative',
  },
  buttonRecovery: {
    position: 'absolute',
    top: 12,
    right: 0,
    padding: '0 4px',
    textTransform: 'none',
    fontSize: 11,
    fontWeight: 400,
    zIndex: 1,
  },
}))
export default class LoginDialogForm extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, opened: false, loading: false };
  }

  onSubmit = async (isValid: boolean) => {
    const { model, loading } = this.state;
    if (!isValid || loading) return;

    this.setState({ loading: true });

    authService.login(model.username, model.password).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(() => {
      this.setState({ loading: false });
      this.resetForm();
    }, err => {
      Toast.error(err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { model, loading } = this.state;
    const { classes, onRecoveryAccess } = this.props;

    return (
      <FormValidation onSubmit={this.onSubmit} ref={this.bindForm}>

        <CardContent className={classes.cardContent}>
          <FieldText
            label='Email'
            type='email'
            disabled={loading}
            value={model.username}
            validation='required|email'
            onChange={this.updateModel((model, v) => model.username = v)}
            margin='dense'
          />

          <div className={classes.passContainer}>
            <Button className={classes.buttonRecovery} disabled={loading} size='small' onClick={onRecoveryAccess}>Esqueceu sua senha?</Button>
            <FieldText
              label='Senha'
              type='password'
              disabled={loading}
              value={model.password}
              validation='required'
              onChange={this.updateModel((model, v) => model.password = v)}
            />
          </div>
        </CardContent>

        <CardActions className={classes.buttons}>
          <Button className={classes.buttonSubmit} variant='contained' color='secondary' type='submit'>
            {!loading && 'Entrar'}
            {loading && <CircularProgress color='inherit' size={20} />}
          </Button>
        </CardActions>

      </FormValidation>
    );
  }
}