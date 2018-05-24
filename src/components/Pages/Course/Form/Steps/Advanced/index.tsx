import { CardContent, Grid, Typography } from '@material-ui/core';
import { FieldDate, FieldRadio, FieldSwitch, FieldValidation } from 'components/Field';
import { FormComponent, IStateForm } from 'components/FormComponent';
import Snackbar from 'components/Snackbar';
import { booleanToFake, fakeToBoolean } from 'formatters/fakeBoolean';
import { ICourseAdvanced } from 'interfaces/course';
import React from 'react';

interface IProps {
  onComplete: Function;
}

interface IState extends IStateForm<ICourseAdvanced & { date?: Date }> {
  saving: boolean;
}

interface IPropsFromConnect {
  savingError?: any;
}

export default class AdvancedFormStep extends FormComponent<IProps & IPropsFromConnect, IState> {
  async onSubmit(event: Event) {
    event.preventDefault();

    const isValid = await this.isFormValid();
    if (!isValid) return;

    // this.props.requestCourseSave(this.state.model as any);
  }

  render() {
    const { model } = this.state;
    const { savingError } = this.props;

    return (
      <form onSubmit={this.onSubmit.bind(this)} noValidate>
        <Snackbar opened={!!savingError} error={savingError} onClose={() => { }} />

        <FieldValidation.Provider value={this.registerFields}>
          <CardContent>

            <Typography variant='subheading'>Tipo de Acesso *</Typography>
            <Typography color='error'>Selecione um tipo de acesso</Typography>

            <Grid container>
              <Grid item xs={12} sm={4}>
                <FieldRadio
                  label='Pago'
                  checked={(model as any).teste === 'pago'}
                  value='pago'
                  onChange={this.updateModel((m, v) => (m as any).teste = v)}
                  helperText={
                    <span>
                      Esse acesso tem <strong>integração com a Eduzz </strong>e os{' '}
                      usuários precisam adquirir o curso.
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FieldRadio
                  label='Gratuito Restrito'
                  checked={(model as any).teste === 'free'}
                  value='free'
                  onChange={this.updateModel((m, v) => (m as any).teste = v)}
                  helperText={
                    <span>
                      Com o acesso restrito qualquer pessoa pode acessar o curso e{' '}
                      <strong>é necessário o cadastro</strong>
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FieldRadio
                  label='Público'
                  checked={(model as any).teste === 'public'}
                  value='public'
                  onChange={this.updateModel((m, v) => (m as any).teste = v)}
                  helperText={
                    <span>
                      Com o acesso público qualquer pessoa pode acessar o curso{' '}
                      sem a necessidade de um cadastro.
                    </span>
                  }
                />
              </Grid>
            </Grid>

            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <FieldDate
                  label='Data de Liberação'
                  validation='required'
                  value={model.releaseAt}
                  onChange={this.updateModel((m, v) => m.releaseAt = v)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldDate
                  label='Data de expiração'
                  validation={`required|${model.releaseAt ? 'after_or_equal:' + model.releaseAt.toISOString() : ''}`}
                  value={model.date}
                  onChange={this.updateModel((m, v) => m.date = v)}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} sm={6}>
                <FieldSwitch
                  label='Destacar'
                  checked={fakeToBoolean(model.advertise)}
                  onChange={this.updateModel((m, v) => m.advertise = booleanToFake(v))}
                  helperText={
                    <span>
                      O curso será oferecido nas áreas promocionais da
                      plataforma.
                    </span>
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FieldSwitch
                  label='Comentários'
                  checked={!fakeToBoolean(model.disableComments)}
                  onChange={this.updateModel((m, v) => m.disableComments = booleanToFake(!v))}
                  helperText={
                    <span>
                      Alunos/usuários podem fazer comentários, nas aulas, que
                      serão moderados pelo produtor.
                    </span>
                  }
                />
              </Grid>
            </Grid>

          </CardContent>
        </FieldValidation.Provider>
      </form>
    );
  }
}