import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FieldText from '@react-form-fields/material-ui/components/Text';
import ValidationContext from '@react-form-fields/material-ui/components/ValidationContext';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import { WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import React, { Fragment } from 'react';

import ImageUploader from './ImageUploader';

//import Toast from 'components/Shared/Toast';
//import rxjsOperators from 'rxjs-operators';
//import upsellService from 'services/upsell';
interface IProps {
  classes?: any;
}

interface IState extends IStateForm<{
  name: string;
  description: string;
  avatar: string;
}> {
  isSending: boolean;
}

@WithRouter()
@WithStyles(theme => ({
  avatarImageContainer: {
    paddingTop: 8,
    marginRight: 16,
  },
  label: {
    padding: 0,
    fontSize: 12,
    lineHeight: 1,
  },
  form: {
    '& p': {
      fontSize: '.75rem',
      paddingTop: 4,
    }
  }
}))
export default class Form extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      ...this.state
    };
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!this.isFormValid()) return;
    this.setState({ isSending: true });

    /* const { model } = this.state;

    try {
      await this.props.sendQuestion({ ...model, cou_hash: model.cou_hash || null });
      this.setState({ model: {} });
      this.props.pushMessage('Solicitação enviada com sucesso!', 'success');
    } catch (error) {
      this.props.pushMessage('Erro ao enviar solicitação!', 'error');
    } finally {
      this.validationContext.reset();
      this.setState({ isSending: false });
    } */
  }

  handleChange = (state: any) => {
    this.setState(state);
  }

  render() {
    const { classes } = this.props;
    const { model, isSending } = this.state;

    return (
      <Fragment>
        <Paper>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <ValidationContext ref={this.bindValidationContext}>
              <Grid container>
                <Grid item xs={12} md={4}>
                  <div className={classes.avatarImageContainer}>
                    <label className={classes.label}>Foto do autor</label>
                    <ImageUploader
                      width={300}
                      height={300}
                      label='avatar'
                      onChange={this.handleChange}
                      image={model.avatar}
                      disabled={isSending}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={8}>
                  <FieldText
                    type='text'
                    label='Nome do Autor'
                    tabIndex={1}
                    validation='required'
                    disabled={isSending}
                    value={model.name}
                    onChange={this.updateModel((m, v) => m.name = v)}
                  />
                  <FieldText
                    multiline
                    rows={100}
                    className='textarea'
                    type='text'
                    label='Resumo do autor'
                    tabIndex={1}
                    validation='required'
                    disabled={isSending}
                    value={model.description}
                    onChange={this.updateModel((m, v) => m.description = v)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    size='medium'
                    type='submit'
                    className='waves-effect waves-light button affirmative'
                    disabled={isSending}
                  >
                    {!isSending ? 'Salvar' : <CircularProgress color='inherit' size={20} />}
                  </Button>
                </Grid>
              </Grid>
            </ValidationContext>
          </form>
        </Paper>
      </Fragment>
    );
  }
}