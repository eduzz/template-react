import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toolbar from 'components/Layout/Toolbar';
import Toast from 'components/Shared/Toast';
import format from 'date-fns/format';
import { WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import ContentSaveIcon from 'mdi-react/ContentSaveIcon';
import React, { Fragment } from 'react';
import RxOp from 'rxjs-operators';
import courseService from 'services/course';

import Content from './Content';
import BannerDialog from './Content/Banner/BannerList/BannerDialog';
import Info from './Info';

export interface IForm {
  model: Form['state']['model'];
  updateModel: Form['updateModel'];
}

interface IProps {
  classes?: any;
  match?: any;
}

interface IState extends IStateForm<{
  id?: number;
  title: string;
  published: boolean;
  description: string;
  access_type: number;
  disable_comments: boolean;
  progress_bar: boolean;
  allow_manual_watch: boolean;
  customization: {
    layout: boolean;
    theme: number;
    avatar: string;
    image_cover: string;
    customizationData: {
      header_background_color: string;
      cover_background_color: string;
      title_color: string;
      header_link_color: string;
      course_description_color: string;
      logo_login: string;
      login_background_image: string;
      login_background_color: string;
    };
  };
  hasterms: boolean;
  terms_content: string;
  release_at: string;
  days_available: number;
  duration: number;
  certificate_progress: number;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  category: {
    id: number;
    name: string;
  };
  logo: string;
  slug: string;
  replaymail: string;
  new_module_notification: boolean;
  new_lesson_notification: boolean;
  defaultthumb: string;
  fc_pixel: string;
  gl_analytics: string;
  cen_cod: number;
  type: number;
}> { }

@WithStyles(theme => ({
  container: {
    padding: 16,
  },
  saveButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
}))
@WithRouter()
export default class Form extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      ...this.state,
      model: {
        title: '',
        description: '',
        published: false,
        access_type: 0,
        disable_comments: false,
        progress_bar: true,
        allow_manual_watch: false,
        customization: {
          layout: true,
          theme: 0,
          avatar: null,
          image_cover: null,
          customizationData: {
            header_background_color: null,
            cover_background_color: null,
            title_color: null,
            header_link_color: null,
            course_description_color: null,
            logo_login: null,
            login_background_image: null,
            login_background_color: null,
          },
        },
        hasterms: false,
        terms_content: '',
        release_at: format(new Date(), 'yyyy-MM-dd'),
        days_available: null,
        duration: null,
        certificate_progress: 100,
        author: {
          id: 0,
          name: '',
          avatar: '',
        },
        category: {
          id: 0,
          name: '',
        },
        logo: null,
        slug: null,
        replaymail: null,
        new_module_notification: false,
        new_lesson_notification: false,
        defaultthumb: null,
        fc_pixel: null,
        gl_analytics: null,
        type: 1,
      },
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id)
      this.loadData();
  }

  loadData = () => {
    const { id } = this.props.match.params;

    courseService.getCourse(id).pipe(
      RxOp.logError(),
      RxOp.loader(),
      RxOp.bindComponent(this),
    ).subscribe((course: any) => {
      this.setState({
        model: {
          ...course,
          release_at: format(new Date(course.release_at), 'yyyy-MM-dd'),
        },
      });
    }, (error: any) => Toast.error(error));
  }

  handleSubmit = (isValid: boolean) => {
    if (!isValid) return;

    const { id } = this.props.match.params;
    const params = {
      ...this.state.model,
    };

    if (id) {
      courseService.edit(id, params).pipe(
        RxOp.loader(),
        RxOp.logError(),
        RxOp.bindComponent(this),
      ).subscribe(() => {
        Toast.show('Curso editado com sucesso!');
      }, (error: any) => {
        Toast.error(error);
      });
    } else {
      courseService.save(params).pipe(
        RxOp.loader(),
        RxOp.logError(),
        RxOp.bindComponent(this),
      ).subscribe(() => {
        Toast.show('Curso criado com sucesso!');
      }, (error: any) => {
        Toast.error(error);
      });
    }
  }

  handleChange = (label: string, value: any) => {
    this.setState({
      [label]: value,
    } as any);
  }

  render() {
    const { classes } = this.props;
    const form = {
      model: this.state.model,
      updateModel: this.updateModel,
    };

    return (
      <Fragment>
        <FormValidation onSubmit={this.handleSubmit}>
          <Toolbar title='Curso' />

          <Grid container>
            <Grid item xs={12}>
              <Info form={form} />
            </Grid>
            <Grid item xs={12}>
              <Content form={form} />
            </Grid>
          </Grid>

          <Tooltip title='Salvar'>
            <Button
              className={classes.saveButton}
              type='submit'
              color='secondary'
              variant='fab'
            >
              <ContentSaveIcon />
            </Button>
          </Tooltip>
        </FormValidation>

        <BannerDialog />
      </Fragment>
    );
  }
}