import { CardContent, Divider, Grid, Typography } from '@material-ui/core';
import { ScrollTopContext } from 'components/AppWrapper';
import { IStateForm } from 'components/FormComponent';
import { WithStyles } from 'decorators/withStyles';
import { booleanToFake, fakeToBoolean } from 'formatters/fakeBoolean';
import { enCourseAccessType, ICourse, ICourseAdvanced } from 'interfaces/course';
import { FieldDate, FieldHtml, FieldRadio, FieldSwitch, FieldText } from 'material-ui-form-fields';
import moment from 'moment';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { requestCourseAdvancedSave } from 'store/actionCreators/course';

import { CourseFormContext } from '..';
import CourseFormBase from '../Base';

interface IProps {
  course: ICourse;
  classes?: any;
}

interface IState extends IStateForm<ICourseAdvanced & { releaseEnd?: Date }> {
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
class CourseAdvancedForm extends CourseFormBase<IProps & IPropsFromConnect, IState> {
  name = 'CourseAdvancedForm';

  constructor(props: IProps) {
    super(props);

    const { course: { advanced } } = this.props;

    this.state = {
      ...this.state,
      model: {
        ...this.state.model,
        ...({
          disableComments: booleanToFake(false),
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

  async doSave() {
    const { model } = this.state;
    const { course, requestCourseAdvancedSave } = this.props;

    course.advanced = model as any;
    return await requestCourseAdvancedSave(course, this.state.model as any);
  }

  canSave() {
    const { model } = this.state;

    if (model.accessType === undefined || model.accessType === null) {
      return { canSave: false, reason: 'Selecione um tipo de acesso' };
    }

    return { canSave: true };
  }

  updateReleaseUntil(model: IState['model'], releaseAt: Date, releaseEnd: Date) {
    model.releaseAt = releaseAt;
    model.releaseEnd = releaseEnd;

    if (!releaseAt || !releaseEnd) return;
    model.daysAvailable = Math.ceil(moment(releaseEnd).diff(releaseAt, 'day', true)) + 1;
  }

  render() {
    const { model, formSubmitted } = this.state;
    const { classes, saving } = this.props;

    return (
      <Fragment>
        <ScrollTopContext.Consumer>
          {this.bindScrollTop.bind(this)}
        </ScrollTopContext.Consumer>

        <CourseFormContext.Consumer>
          {context => this.setContext(context)}
        </CourseFormContext.Consumer>

        <CardContent>

          <Typography variant='subheading'>Tipo de Acesso *</Typography>
          {formSubmitted && (model.accessType === undefined || model.accessType === null) &&
            <Typography color='error'>Selecione um tipo de acesso</Typography>
          }

          <Grid container>
            <Grid item xs={12} sm={4}>
              <FieldRadio
                label='Pago'
                disabled={saving}
                checked={model.accessType === enCourseAccessType.paid}
                value={enCourseAccessType.paid}
                onChange={this.updateModel((m, v) => m.accessType = v)}
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
                disabled={saving}
                checked={model.accessType === enCourseAccessType.freeWithAccount}
                value={enCourseAccessType.freeWithAccount}
                onChange={this.updateModel((m, v) => m.accessType = v)}
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
                disabled={saving}
                checked={model.accessType === enCourseAccessType.free}
                value={enCourseAccessType.free}
                onChange={this.updateModel((m, v) => m.accessType = v)}
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
                disabled={saving}
                validation='required'
                value={model.releaseAt}
                onChange={this.updateModel((m, v) => this.updateReleaseUntil(m, v, model.releaseEnd))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FieldDate
                label='Data de expiração'
                disabled={saving}
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
                disabled={saving}
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
                disabled={saving}
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
            disabled={saving}
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
            disabled={saving}
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
                disabled={saving}
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
                disabled={saving}
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
                disabled={saving}
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
                disabled={saving}
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

      </Fragment>
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
})(CourseAdvancedForm);