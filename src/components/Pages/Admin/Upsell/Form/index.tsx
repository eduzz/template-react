import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toolbar from 'components/Layout/Toolbar';
import Toast from 'components/Shared/Toast';
import { WithRouter } from 'decorators/withRouter';
import { History } from 'history';
import { IUpsell } from 'interfaces/models/upsell';
import React from 'react';
import rxjsOperators from 'rxjs-operators';
import upsellService from 'services/upsell';
import Content from './Content';
import { WithStyles } from 'decorators/withStyles';
import FileDocumentIcon from 'mdi-react/FileDocumentIcon';
import FieldSwitch from '@react-form-fields/material-ui/components/Switch';

import { UpsellFormContext } from './Context';

interface IProps {
  classes?: any;
  match?: any;
  history?: History;
}

interface IState extends IStateForm<IUpsell> {
  updateModel: (handler: (model: Partial<IUpsell>, value: any) => void) => any;
  isFormValid: boolean;
  flowStep: number;
  updateFlowStep: (flowStep: number) => void;
}

@WithStyles(theme => ({
  root: {
    height: 'calc(100vh - 48px)',
  },
  icon: {
    fill: theme.palette.text.primary,
  },
}))
@WithRouter()
export default class Form extends FormComponent<IProps, IState> {
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
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (!id) return;

    upsellService.getUpsell(id).pipe(
      rxjsOperators.loader(),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
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
    this.setState({
      flowStep
    });
  }

  handleSubmit = (isValid: boolean) => {
    console.log(this.state.model);

    const { highlight_images, small_image, external_url, show_type, course_hash } = this.state.model;

    const isFormValid = isValid && !!highlight_images.large && !!small_image;

    this.setState({
      isFormValid,
    });

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
        this.state.model.courses
          .filter(course => course.course_page || course.modules
            .some(module => module.checked || module.lessons
              .some(lesson => lesson.checked)))
        : [],
    };

    upsellService.save(model as IUpsell).pipe(
      rxjsOperators.loader(),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
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
    const { classes } = this.props;
    const { flowStep, model, updateModel } = this.state;

    console.log(this.state.model);

    return (
      <FormValidation onSubmit={this.handleSubmit} ref={this.bindForm}>
        <UpsellFormContext.Provider value={this.state}>
          <div className={classes.root}>
            <Toolbar>
              <Grid container spacing={8} alignItems='center'>
                <Grid item>
                  <FileDocumentIcon className={classes.icon} />
                </Grid>
                <Grid item xs={true}>
                  <Typography variant='h6'>Ofertas</Typography>
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

            <Card>
              <Content step={flowStep} />
            </Card>
          </div>
        </UpsellFormContext.Provider>
      </FormValidation>
    );
  }
}