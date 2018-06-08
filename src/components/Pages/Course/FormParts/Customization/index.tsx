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
        ...(customization || {
          titleColor: null,
          headerLinkColor: null,
          headerBackgroundColor: null,
          coverBackgroundColor: null,
          loginBackgroundColor: null,

          imageCover: null,
          imageAvatar: null,
          logoLogin: null,
          loginBackgroundImage: null,

          cssUrl: null,
        })
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

          <FieldColor
            label='Cor do Título'
            disabled={saving}
            value={model.titleColor}
            onChange={this.updateModel((m, v) => m.titleColor = v)}
          />

          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <FieldColor
                label='Cor do link no cabeçalho'
                disabled={saving}
                value={model.headerLinkColor}
                onChange={this.updateModel((m, v) => m.headerLinkColor = v)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FieldColor
                label='Cor do fundo do cabeçalho'
                disabled={saving}
                value={model.headerBackgroundColor}
                onChange={this.updateModel((m, v) => m.headerBackgroundColor = v)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <FieldColor
                label='Cor da capa'
                disabled={saving}
                value={model.coverBackgroundColor}
                onChange={this.updateModel((m, v) => m.coverBackgroundColor = v)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FieldColor
                label='Cor do Login'
                disabled={saving}
                value={model.loginBackgroundColor}
                onChange={this.updateModel((m, v) => m.loginBackgroundColor = v)}
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
            value={model.imageCover}
            onChange={this.updateModel(((m, v) => m.imageCover = v))}
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