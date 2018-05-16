import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@material-ui/core';
import Field from 'components/Field';
import { FormComponent, IStateForm } from 'components/FormComponent';
import { WithStyles } from 'decorators/withStyles';
import React from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';

import UserValidator from './validator';

interface IState extends IStateForm<{
  email: string;
  password: string;
}> { }

interface IPropsFromConnect {
  opened: boolean;
  loading: boolean;
  classes?: any;
}

@WithStyles(theme => ({
  content: {
    padding: theme.variables.contentPaddingUpSm,
    paddingTop: 0,
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  }
}))
class UserFormModal extends FormComponent<IPropsFromConnect, IState> {
  validator = new UserValidator();

  constructor(props: any) {
    super(props);
    this.state = { formSubmitted: false, model: {} };
  }

  onClose() {
    this.setState({ formSubmitted: false, model: {} });
  }

  render() {
    const { model, formSubmitted } = this.state;
    const { opened, loading, classes } = this.props;

    return (
      <Dialog
        open={opened}
        onClose={this.onClose.bind(this)}
        TransitionComponent={Transition}>

        <form>
          <DialogTitle>Novo Usuário</DialogTitle>
          <DialogContent>

            <div className={classes.content}>

              <Field
                label='Email'
                type='email'
                disabled={loading}
                value={model.email}
                submitted={formSubmitted}
                error={this.getErrorMessage('email')}
                onChange={this.updateModel((model, v) => model.email = v)}
                margin='none'
              />

            </div>

          </DialogContent>
          <DialogActions>
            <Button color='primary'>
              Disagree
            </Button>
            <Button color='primary' autoFocus>
              Agree
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}) => {
  return {
    opened: state.user.userFormModal.isOpened,
    loading: false,
  };
};

export default connect<IPropsFromConnect, {}, {}>(mapStateToProps, {
})(UserFormModal);

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}