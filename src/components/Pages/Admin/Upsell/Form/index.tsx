import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldSwitch from '@react-form-fields/material-ui/components/Switch';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toolbar from 'components/Layout/Toolbar';
import { ScrollTopContext } from 'components/Pages/Admin';
import Toast from 'components/Shared/Toast';
import { WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import { History } from 'history';
import { IUpsell } from 'interfaces/models/upsell';
import React from 'react';
import RxOp from 'rxjs-operators';
import upsellService from 'services/upsell';

import Content from './Content';
import { IUpsellFormContext, UpsellFormContext } from './Context';

interface IProps {
  classes?: any;
  match?: any;
  history?: History;
  scrollTop: Function;
}

interface IState extends IStateForm<IUpsell>, IUpsellFormContext {
}

@WithRouter()
@WithStyles(theme => ({
  icon: {
    fill: theme.palette.text.primary,
  },
}))
class Form extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...this.state,
      model: {
        type: null,
        content_id: null,
        pre_content_id: null,
        description: '',
        label_text: 'Saiba mais',
        title: '',
        show_type: 1,
        highlight_images: {
          large: null,
          medium: null,
          small: null,
        },
        small_image: '',
        external_url: '',
        course_hash: '',
        highlight: false,
        offer_shelf: false,
        published: true,
        courses: [],
      },
      updateModel: this.updateModel,
      isFormValid: true,
      flowStep: 0,
      updateFlowStep: this.updateFlowStep,
      setUpdateHeight: f => this.updateHeight = f,
      updateHeight: () => {
        setTimeout(() => this.updateHeight(), 100);
        setTimeout(() => this.updateHeight(), 500);
        setTimeout(() => this.updateHeight(), 1000);
      }
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (!id) return;

    upsellService.getUpsell(id).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(model => {
      this.setState({
        model: {
          ...this.state.model,
          ...model,
          content_id: model.content_id.toString(),
          pre_content_id: model.content_id.toString(),
        },
      });
    }, error => {
      this.props.history.push('/upsell');
      Toast.error(error);
    });
  }

  updateFlowStep = (flowStep: number) => {
    this.setState({ flowStep });
    this.props.scrollTop();
  }

  updateHeight = () => { };

  handleSubmit = (isValid: boolean) => {
    const {
      highlight_images,
      highlight,
      offer_shelf,
      has_selected_courses,
      has_selected_lessons,
      small_image,
      external_url,
      show_type,
      course_hash
    } = this.state.model;

    const isHighlightInvalid = !!highlight && !highlight_images.large;
    const isSmallInvalid = (!!offer_shelf || !!has_selected_courses || !!has_selected_lessons) && !small_image;

    const isFormValid = isValid && !isHighlightInvalid && !isSmallInvalid;

    this.setState({ isFormValid });

    if (show_type === 2 && !course_hash) return;
    if (show_type === 3 && !external_url) return;

    if (!isFormValid) {
      Toast.error('Ops... Você esqueceu algumas informações necessárias');
      this.updateFlowStep(1);
      return;
    }

    const model = {
      ...this.state.model,
      courses: this.state.model.has_selected_courses || this.state.model.has_selected_lessons ?
        this.state.model.courses.filter(course => {
          if (!this.state.model.has_selected_courses) {
            course.course_page = false;
          }

          return course.course_page || course.modules.some(module => {
            if (!this.state.model.has_selected_lessons) {
              module.checked = false;
            }

            return module.checked || module.lessons.some(lesson => {
              if (!this.state.model.has_selected_lessons) {
                lesson.checked = false;
              }

              return lesson.checked;
            });
          });
        })
        : [],
    };

    upsellService.save(model as IUpsell).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(() => {
      this.props.history.push('/upsell/sucesso');
    }, (error: any) => {
      Toast.error(error);
    });
  }

  getFormStatus = () => {
    return this.isFormValid();
  }

  render() {
    const { flowStep, model, updateModel } = this.state;
    const { match } = this.props;

    return (
      <FormValidation onSubmit={this.handleSubmit} ref={this.bindForm}>
        <UpsellFormContext.Provider value={this.state}>
          <Toolbar>
            <Grid container spacing={8} alignItems='center'>
              <Grid item xs={true}>
                <Typography variant='h6' color='inherit'>
                  {match.params.id ? 'Editar' : 'Nova'} Oferta
                </Typography>
              </Grid>
              <Grid item xs={false}>
                <FieldSwitch
                  checked={model.published}
                  onChange={updateModel((model, v) => model.published = v)}
                  label='Publicado'
                />
              </Grid>
            </Grid>
          </Toolbar>

          <Content step={flowStep} />

        </UpsellFormContext.Provider>
      </FormValidation>
    );
  }
}

export default React.forwardRef<Form>((props, ref) => (
  <ScrollTopContext.Consumer>
    {scrollTop => <Form {...props} ref={ref} scrollTop={scrollTop} />}
  </ScrollTopContext.Consumer>
));