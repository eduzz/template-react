import { CardContent, Divider, Grid, Typography } from '@material-ui/core';
import { ScrollTopContext } from 'components/AppWrapper';
import { IStateForm } from 'components/FormComponent';
import { WithStyles } from 'decorators/withStyles';
import { booleanToFake, fakeToBoolean } from 'formatters/fakeBoolean';
import { ICourse, ICourseAdvanced } from 'interfaces/course';
import { FieldDate, FieldHtml, FieldRadio, FieldSwitch, FieldText, ValidationContext } from 'material-ui-form-fields';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { requestCourseAdvancedSave } from 'store/actionCreators/course';

import { CourseFormContext } from '..';
import CourseFormBase from '../Base';

interface IProps {
  onComplete: (course: ICourse) => void;
  course: ICourse;
  classes?: any;
}

interface IState extends IStateForm<ICourseAdvanced & { releaseEnd?: Date }> {
  saving: boolean;
}

interface IPropsFromConnect {
  saving: boolean;
  savingError?: any;
  requestCourseAdvancedSave?: typeof requestCourseAdvancedSave;
}

@WithStyles({
  divider: {
    marginTop: 30,
    marginBottom: 10
  }
})
class AdvancedFormStep extends CourseFormBase<IProps & IPropsFromConnect, IState> {
  constructor(props: IProps) {
    super(props);

    const { course: { advanced } } = this.props;

    this.state = {
      ...this.state,
      model: {
        ...this.state.model,
        ...({
          disableComments: booleanToFake(false),
          accessType: booleanToFake(false),
          hasTerms: booleanToFake(false),
          termsContent: '',
          advertise: booleanToFake(false),
          newModuleNotification: booleanToFake(false),
          newLessonNotification: booleanToFake(false),
          allowManualWatch: booleanToFake(false),
          emailNotification: booleanToFake(false),
        }),
        ...(advanced ? {
          ...advanced,
          releaseEnd: advanced.releaseAt ?
            moment(advanced.releaseAt).add(advanced.daysAvailable, 'day').toDate() :
            null
        } : {})
      }
    };
  }

  static getDerivedStateFromProps(nextProps: IProps & IPropsFromConnect, currentState: IState): IState {
    if (currentState.saving && !nextProps.saving && !nextProps.savingError) {
      //save completed
      nextProps.onComplete(nextProps.course);
    }

    return {
      ...currentState,
      saving: nextProps.saving
    };
  }

  async onSubmit(event?: Event) {
    const { model } = this.state;
    const { course, requestCourseAdvancedSave } = this.props;

    event && event.preventDefault();

    const isValid = await this.isFormValid();
    if (!isValid || !model.payment) return;

    course.advanced = model as any;
    requestCourseAdvancedSave(course, this.state.model as any);
  }

  askSave() {
    this.onSubmit();
  }

  updateReleaseUntil(model: IState['model'], releaseAt: Date, releaseEnd: Date) {
    model.releaseAt = releaseAt;
    model.releaseEnd = releaseEnd;

    if (!releaseAt || !releaseEnd) return;
    model.daysAvailable = Math.ceil(moment(releaseEnd).diff(releaseAt, 'day', true)) + 1;
  }

  render() {
    const { model, formSubmitted } = this.state;
    const { classes } = this.props;

    return (
      <form onSubmit={this.onSubmit.bind(this)} noValidate>
        <ScrollTopContext.Consumer>
          {this.bindScrollTop.bind(this)}
        </ScrollTopContext.Consumer>

        <CourseFormContext.Consumer>
          {context => this.setContext(context)}
        </CourseFormContext.Consumer>

        <ValidationContext ref={this.bindValidationContext.bind(this)}>
          <CardContent>

            <Typography variant='subheading'>Tipo de Acesso *</Typography>
            {formSubmitted && !model.payment &&
              <Typography color='error'>Selecione um tipo de acesso</Typography>
            }

            <Grid container>
              <Grid item xs={12} sm={4}>
                <FieldRadio
                  label='Pago'
                  checked={model.payment === 'pago'}
                  value='pago'
                  onChange={this.updateModel((m, v) => m.payment = v)}
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
                  checked={model.payment === 'free'}
                  value='free'
                  onChange={this.updateModel((m, v) => m.payment = v)}
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
                  checked={model.payment === 'public'}
                  value='public'
                  onChange={this.updateModel((m, v) => m.payment = v)}
                  helperText={
                    <span>
                      Com o acesso público qualquer pessoa pode acessar o curso{' '}
                      <strong>sem a necessidade de um cadastro.</strong>
                    </span>
                  }
                />
              </Grid>
            </Grid>

            <Divider className={classes.divider} />
            <Typography variant='subheading'>Datas</Typography>

            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <FieldDate
                  label='Data de Liberação'
                  validation='required'
                  value={model.releaseAt}
                  onChange={this.updateModel((m, v) => this.updateReleaseUntil(m, v, model.releaseEnd))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldDate
                  label='Data de expiração'
                  validation='required|after_or_equal:a data de liberação'
                  validationContext={{ 'a data de liberação': model.releaseAt }}
                  value={model.releaseEnd}
                  onChange={this.updateModel((m, v) => this.updateReleaseUntil(m, model.releaseAt, v))}
                />
              </Grid>
            </Grid>

            <Divider className={classes.divider} />
            <Typography variant='subheading'>Configurações</Typography>

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

            <Divider className={classes.divider} />
            <Typography variant='subheading'>Termos e Condições</Typography>

            <FieldSwitch
              label='Habilitar'
              checked={fakeToBoolean(model.hasTerms)}
              onChange={this.updateModel((m, v) => m.hasTerms = booleanToFake(v))}
              helperText={
                <span>
                  Habilite para Exibir os Termos e Condições para o Aluno ingressar no curso.
                </span>
              }
            />

            <FieldHtml
              label='Termos e Condições'
              multiline
              validation='required_if:termos e condições habilitado,1'
              validationContext={{ 'termos e condições habilitado': model.hasTerms }}
              value={model.termsContent}
              onChange={this.updateModel((m, v) => m.termsContent = v)}
            />

            <Divider className={classes.divider} />
            <Typography variant='subheading'>Comunicação</Typography>

            <Grid container>
              <Grid item xs={12} sm={6}>
                <FieldText
                  label='Email do curso'
                  validation='required|email'
                  value={model.replyEmail}
                  onChange={this.updateModel((m, v) => m.replyEmail = v)}
                  helperText={
                    <span>
                      O email cadastrado receberá as respostas que forem enviadas pelos alunos.
                    </span>
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FieldSwitch
                  label='Notificações da Plataforma'
                  checked={fakeToBoolean(model.emailNotification)}
                  onChange={this.updateModel((m, v) => m.emailNotification = booleanToFake(v))}
                  helperText={
                    <span>
                      Usar e-mail cadastrado para receber notificações
                      sobre atualizações, novidades da Plataforma Nutror.
                    </span>
                  }
                />
              </Grid>
            </Grid>

            <Divider className={classes.divider} />
            <Typography variant='subheading'>Notificar Alunos</Typography>

            <Grid container>
              <Grid item xs={12} sm={6}>
                <FieldSwitch
                  label='Atualizações sobre Módulos'
                  checked={fakeToBoolean(model.newModuleNotification)}
                  onChange={this.updateModel((m, v) => m.newModuleNotification = booleanToFake(v))}
                  helperText={
                    <span>
                      Ativando esta opção os alunos serão notificados via e-mail sobre cada novidade de
                      <strong> Módulos do Curso</strong>.
                    </span>
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FieldSwitch
                  label='Atualizações sobre Aulas'
                  checked={fakeToBoolean(model.newLessonNotification)}
                  onChange={this.updateModel((m, v) => m.newLessonNotification = booleanToFake(v))}
                  helperText={
                    <span>
                      Ativando esta opção os alunos serão notificados via e-mail sobre
                      cada novidade de <strong>Aulas do Curso</strong>.
                    </span>
                  }
                />
              </Grid>
            </Grid>

          </CardContent>

        </ValidationContext>
      </form>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}): IPropsFromConnect => {
  return {
    saving: state.course.saveAdvanced.isSaving,
    savingError: state.course.saveAdvanced.error
  };
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  requestCourseAdvancedSave
})(AdvancedFormStep);