import { CardContent, Divider, Grid, Typography } from '@material-ui/core';
import { FieldValidation } from 'components/Field';
import FieldColor from 'components/Field/Color';
import { IStateForm } from 'components/FormComponent';
import { WithStyles } from 'decorators/withStyles';
import { ICourse, ICourseCustomization } from 'interfaces/course';
import React from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';

import { StepContext } from '..';
import { ScrollTopContext } from '../../../../../AppWrapper';
import StepBaseComponent from '../Base';
import ImageSelector from './Image';

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
  // requestCourseAdvancedSave?: typeof requestCourseAdvancedSave;
}

@WithStyles({
  divider: {
    marginTop: 30,
    marginBottom: 10
  }
})
class CustomizationFormStep extends StepBaseComponent<IProps & IPropsFromConnect, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...this.state,
      model: {
        ...this.state.model
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
    event && event.preventDefault();

    const isValid = await this.isFormValid();
    if (!isValid) return;

    // course.advanced = model as any;
    // requestCourseAdvancedSave(course, this.state.model as any);
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

        <StepContext.Consumer>
          {context => this.setContext(context)}
        </StepContext.Consumer>

        <FieldValidation.Provider value={this.registerFields}>
          <CardContent>
            <Typography variant='subheading'>Cores</Typography>

            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <FieldColor
                  label='Cor Primária'
                  value={model.primaryColor}
                  onChange={this.updateModel((m, v) => m.primaryColor = v)}
                  validation='required'
                  helperText='Essa cor será utilizada em grande parte do elementos visuais do curso.'
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FieldColor
                  label='Cor Destaque'
                  value={model.featuredColor}
                  onChange={this.updateModel((m, v) => m.featuredColor = v)}
                  validation='required'
                  helperText='Personalize a cor de ação, ela será utilizada em botões e links, elementos que chamam atenção do aluno.'
                />
              </Grid>
            </Grid>

            <Divider className={classes.divider} />
            <Typography variant='subheading'>Imagens</Typography>

            <ImageSelector width={500} height={300} />

          </CardContent>
        </FieldValidation.Provider>
      </form>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}): IPropsFromConnect => {
  return {
    saving: state.course.isSaving,
    savingError: state.course.saveError
  };
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  // requestCourseAdvancedSave
})(CustomizationFormStep);