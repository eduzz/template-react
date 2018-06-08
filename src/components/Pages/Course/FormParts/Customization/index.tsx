import { CardContent, Divider, Grid, Typography } from '@material-ui/core';
import { ScrollTopContext } from 'components/AppWrapper';
import { IStateForm } from 'components/FormComponent';
import ImageSelector from 'components/ImageSelector';
import { WithStyles } from 'decorators/withStyles';
import { ICourse, ICourseCustomization } from 'interfaces/course';
import { FieldColor } from 'material-ui-form-fields';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { requestCourseCustomizationSave } from 'store/actionCreators/course';

import { CourseFormContext } from '..';
import CourseFormBase from '../Base';
import Image from './Image';

interface IProps {
  course: ICourse;
  classes?: any;
}

interface IState extends IStateForm<ICourseCustomization> {
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
class CourseCustomizationForm extends CourseFormBase<IProps & IPropsFromConnect, IState> {
  name: string = 'CourseCustomizationForm';
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

  async doSave() {
    const { course, requestCourseCustomizationSave } = this.props;
    return await requestCourseCustomizationSave(course, this.state.model as any);
  }

  canSave() {
    return { canSave: true };
  }

  render() {
    const { model } = this.state;
    const { classes, saving } = this.props;

    return (
      <Fragment>
        <ScrollTopContext.Consumer>
          {this.bindScrollTop.bind(this)}
        </ScrollTopContext.Consumer>

        <CourseFormContext.Consumer>
          {this.setContext.bind(this)}
        </CourseFormContext.Consumer>

        <CardContent>
          <Typography variant='title'>Cores</Typography>

          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <FieldColor
                label='Cor Primária'
                disabled={saving}
                value={model.primaryColor}
                onChange={this.updateModel((m, v) => m.primaryColor = v)}
                helperText='Essa cor será utilizada em grande parte do elementos visuais do curso.'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FieldColor
                label='Cor Destaque'
                disabled={saving}
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
            disabled={saving}
            width={200}
            height={200}
            className={classes.image}
            value={model.thumbnailImage}
            onChange={this.updateModel(((m, v) => m.thumbnailImage = v))}
          />

          <Image
            label='Imagem de Fundo'
            helperText='Essa imagem será usada na tela do curso'
            disabled={saving}
            width={1440}
            height={400}
            className={classes.image}
            value={model.backgroundImage}
            onChange={this.updateModel(((m, v) => m.backgroundImage = v))}
          />

          <Image
            label='Logo do Cabeçalho'
            helperText='Logo que aparecerá no topo da página'
            disabled={saving}
            width={200}
            height={40}
            className={classes.image}
            value={model.headerImage}
            onChange={this.updateModel(((m, v) => m.headerImage = v))}
          />

        </CardContent>
      </Fragment>
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
})(CourseCustomizationForm);