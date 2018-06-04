import { CardContent, Divider, Grid, Typography } from '@material-ui/core';
import { ScrollTopContext } from 'components/AppWrapper';
import { IStateForm } from 'components/FormComponent';
import ImageSelector from 'components/ImageSelector';
import { WithStyles } from 'decorators/withStyles';
import { ICourse, ICourseCustomization } from 'interfaces/course';
import { FieldColor, ValidationContext } from 'material-ui-form-fields';
import React from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { requestCourseCustomizationSave } from 'store/actionCreators/course';

import { CourseFormContext } from '..';
import CourseFormBase from '../Base';
import Image from './Image';

interface IProps {
  onComplete: (course: ICourse) => void;
  course: ICourse;
  classes?: any;
}

interface IState extends IStateForm<ICourseCustomization> {
  saving: boolean;
}

interface IPropsFromConnect {
  saving: boolean;
  savingError?: any;
  requestCourseCustomizationSave?: typeof requestCourseCustomizationSave;
}

@WithStyles({
  divider: {
    marginTop: 30,
    marginBottom: 10
  },
  image: {
    margin: '20px 0'
  }
})
class CustomizationFormStep extends CourseFormBase<IProps & IPropsFromConnect, IState> {
  imageSelector: ImageSelector;

  constructor(props: IProps) {
    super(props);

    const { course: { customization } } = this.props;

    this.state = {
      ...this.state,
      model: {
        ...this.state.model,
        ...(customization || {})
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
    const { course, requestCourseCustomizationSave } = this.props;

    event && event.preventDefault();

    const isValid = await this.isFormValid();
    if (!isValid) return;

    requestCourseCustomizationSave(course, this.state.model as any);
  }

  askSave() {
    this.onSubmit();
  }

  render() {
    const { model } = this.state;
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
            <Typography variant='title'>Cores</Typography>

            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <FieldColor
                  label='Cor Primária'
                  value={model.primaryColor}
                  onChange={this.updateModel((m, v) => m.primaryColor = v)}
                  helperText='Essa cor será utilizada em grande parte do elementos visuais do curso.'
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FieldColor
                  label='Cor Destaque'
                  value={model.featuredColor}
                  onChange={this.updateModel((m, v) => m.featuredColor = v)}
                  helperText='Personalize a cor de ação, ela será utilizada em botões e links, elementos que chamam atenção do aluno.'
                />
              </Grid>
            </Grid>

            <Divider className={classes.divider} />
            <Typography variant='title'>Imagens</Typography>

            <Image
              label='Miniatura'
              helperText='Essa imagem será usada na listagem do curso'
              width={200}
              height={200}
              className={classes.image}
              value={model.thumbnailImage}
              onChange={this.updateModel(((m, v) => m.thumbnailImage = v))}
            />

            <Image
              label='Imagem de Fundo'
              helperText='Essa imagem será usada na tela do curso'
              width={1440}
              height={400}
              className={classes.image}
              value={model.backgroundImage}
              onChange={this.updateModel(((m, v) => m.backgroundImage = v))}
            />

            <Image
              label='Logo do Cabeçalho'
              helperText='Logo que aparecerá no topo da página'
              width={200}
              height={40}
              className={classes.image}
              value={model.headerImage}
              onChange={this.updateModel(((m, v) => m.headerImage = v))}
            />

          </CardContent>
        </ValidationContext>
      </form>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}): IPropsFromConnect => {
  return {
    saving: state.course.saveCustomization.isSaving,
    savingError: state.course.saveCustomization.error
  };
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  requestCourseCustomizationSave
})(CustomizationFormStep);