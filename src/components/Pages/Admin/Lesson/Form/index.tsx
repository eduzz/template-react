import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toolbar from 'components/Layout/Toolbar';
import Toast from 'components/Shared/Toast';
import { WithRouter } from 'decorators/withRouter';
import { dateFormat } from 'formatters/date';
import ContentSaveIcon from 'mdi-react/ContentSaveIcon';
import React from 'react';
import RxOp from 'rxjs-operators';
import lessonService from 'services/lesson';

import Chats from './Chats';
import Description from './Description';
import LessonImageUpload from './LessonImageUpload';
import LessonType from './LessonType';
import Options from './Options';
import ShortDescription from './ShortDescription';
import Title from './Title';

export interface IForm {
  model: Partial<IModel>;
  updateModel: (handler: (model: IModel, value: any) => void) => any;
}

export interface IModel {
  id?: number;
  module_id?: number;
  title: string;
  description: string;
  lesson_type: {
    id: number;
  };
  content: {
    1: string;
    2: string;
    4: string;
    5: string;
  };
  author: {
    id?: number;
  };
  release_at: string;
  available_days: number;
  days_locked: number;
  image: string;
  sequence: number;
  slug: string;
  is_free: boolean;
  is_draft: boolean;
  download_enabled: boolean;
  chats: {
    hasjivochat: boolean;
    jivochat: string;
    haszopimchat: boolean;
    zopimchat: string;
    hastawktochat: boolean;
    tawktochat: string;
    haszendeskchat: boolean;
    zendeskchat: string;
    haslivechat: boolean;
    livechat: string;
    haschatroll: boolean;
    chatroll: string;
    chatroll_tipo: number;
    hasintercom: boolean;
    intercom: string;
  };
  description_type: 'Descricao' | 'Iframe';
  iframe_url: string;
  iframe_config: string;
  created_at: string;
  drm: boolean;
  shortdescription: string;
}

interface IProps {
  classes?: any;
  match?: any;
}

interface IState extends IStateForm<IModel> { }

@WithRouter()
export default class Form extends FormComponent<IProps, IState> {
  private initialState: IModel = {
    title: '',
    description: '',
    lesson_type: {
      id: 1,
    },
    content: {
      1: '',
      2: '',
      4: '',
      5: '',
    },
    author: {},
    release_at: dateFormat(new Date(), 'yyyy-MM-dd'),
    available_days: null,
    days_locked: null,
    image: '',
    sequence: null,
    slug: '',
    is_free: false,
    is_draft: false,
    download_enabled: false,
    chats: {
      hasjivochat: false,
      jivochat: '',
      haszopimchat: false,
      zopimchat: '',
      hastawktochat: false,
      tawktochat: '',
      haszendeskchat: false,
      zendeskchat: '',
      haslivechat: false,
      livechat: '',
      haschatroll: false,
      chatroll: '',
      chatroll_tipo: 0,
      hasintercom: false,
      intercom: '',
    },
    iframe_url: '',
    iframe_config: '',
    created_at: '',
    drm: false,
    shortdescription: '',
    description_type: 'Descricao',
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      model: {
        ...this.initialState,
      },
    };
  }

  componentDidMount() {
    const { lessonId } = this.props.match.params;

    if (lessonId)
      this.loadData(lessonId);
  }

  loadData = (lessonId: number) => {
    lessonService.getLesson(lessonId).pipe(
      RxOp.logError(),
      RxOp.loader(),
      RxOp.bindComponent(this),
    ).subscribe((lesson: any) => {
      this.setState({
        model: {
          ...lesson,
          release_at: dateFormat(new Date(lesson.release_at), 'yyyy-MM-dd'),
        },
      });
    }, (error: any) => Toast.error(error));
  }

  handleSubmit = (e: any) => {
    const { model } = this.state;

    lessonService.save(model).pipe(
      RxOp.logError(),
      RxOp.loader(),
      RxOp.bindComponent(this),
    ).subscribe((lesson: any) => {
      console.log(lesson);
    }, (error: any) => Toast.error(error));
  }

  render() {
    const { match: { params } } = this.props;
    const { model } = this.state;

    const form = {
      model,
      updateModel: this.updateModel,
    } as IForm;

    console.log(model);

    return (
      <FormValidation onSubmit={this.handleSubmit}>
        <Toolbar>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={true}>
              <Typography variant='h6' color='inherit' noWrap>
                {`${params.id ? 'Editar' : 'Nova'} Aula`}
              </Typography>
            </Grid>

            <Grid item xs={false}>
              <Button type='submit' color='secondary' variant='raised' disabled={false}>
                <ContentSaveIcon />
                <Hidden implementation='css' xsDown>Salvar</Hidden>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>

        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Title form={form} />
          </Grid>
          <Grid item xs={12}>
            <LessonType form={form} />
          </Grid>
          <Grid item xs={12}>
            <ShortDescription form={form} />
          </Grid>
          <Grid item xs={12}>
            <Description form={form} />
          </Grid>
          <Grid item xs={12}>
            <Options form={form} />
          </Grid>
          <Grid item xs={12}>
            <Chats form={form} />
          </Grid>
          <Grid item xs={12}>
            <LessonImageUpload form={form} />
          </Grid>
        </Grid>
      </FormValidation>
    );
  }
}