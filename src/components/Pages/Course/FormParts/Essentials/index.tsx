import { Button, CardContent, Grid, Hidden } from '@material-ui/core';
import { ScrollTopContext } from 'components/AppWrapper';
import ErrorMessage from 'components/ErrorMessage';
import { IStateForm } from 'components/FormComponent';
import { IAuthor } from 'interfaces/author';
import { ICourse } from 'interfaces/course';
import { FieldHtml, FieldSelect, FieldText, ValidationContext } from 'material-ui-form-fields';
import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
import React from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { openAuthorFormModal, requestAuthorList } from 'store/actionCreators/author';
import { requestCategoryList } from 'store/actionCreators/category';
import { requestCourseSave } from 'store/actionCreators/course';

import { CourseFormContext, ICourseFormContext } from '..';
import CourseFormBase from '../Base';

interface IState extends IStateForm<ICourse> {
  saving: boolean;
  getNextAuthor: boolean;
}

interface IProps {
  course?: ICourse;
  onComplete: (course: ICourse) => void;
}

interface IPropsFromConnect {
  loading: { category: boolean, author: boolean };
  loadingError: any;
  saving: boolean;
  savingError: any;
  lastCourseSaved: ICourse;
  authors: { value: number, label: string }[];
  lastAuthorSaved: IAuthor;
  categories: { value: number, label: string }[];
  classes?: any;
  openAuthorFormModal?: typeof openAuthorFormModal;
  requestCategoryList?: typeof requestCategoryList;
  requestAuthorList?: typeof requestAuthorList;
  requestCourseSave?: typeof requestCourseSave;
}

class EssentialFormStep extends CourseFormBase<IProps & IPropsFromConnect, IState> {
  stepContext: ICourseFormContext;

  constructor(props: IProps) {
    super(props);
    this.state = {
      ...this.state,
      model: {
        ...this.state.model,
        ...(props.course || {})
      }
    };
  }

  static getDerivedStateFromProps(nextProps: IProps & IPropsFromConnect, currentState: IState): IState {
    if (currentState.saving && !nextProps.saving && !nextProps.savingError) {
      //save completed
      nextProps.onComplete(nextProps.lastCourseSaved);
    }

    let getNextAuthor = currentState.getNextAuthor;
    let author = currentState.model.author;

    if (currentState.getNextAuthor && nextProps.lastAuthorSaved) {
      getNextAuthor = false;
      author = { id: nextProps.lastAuthorSaved.id };
    }

    return {
      ...currentState,
      saving: nextProps.saving,
      getNextAuthor,
      model: {
        published: '0',
        ...currentState.model,
        author
      }
    };
  }

  componentDidMount() {
    this.load();
  }

  load() {
    const { categories, requestCategoryList, requestAuthorList } = this.props;

    requestAuthorList({ size: 999 });
    if (!categories.length) requestCategoryList();
  }

  newAuthor() {
    this.setState({ getNextAuthor: true });
    this.props.openAuthorFormModal();
  }

  async onSubmit(event?: Event) {
    event && event.preventDefault();

    const isValid = await this.isFormValid();
    if (!isValid) return;

    this.props.requestCourseSave(this.state.model as any);
  }

  askSave() {
    this.onSubmit();
  }

  render() {
    const { model, saving } = this.state;
    const { categories, authors, loading, loadingError } = this.props;

    if (loadingError) {
      return (
        <ErrorMessage error={loadingError} tryAgain={() => this.load()} />
      );
    }

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
            <FieldText
              label='Nome do Curso/Programa'
              validation='required'
              value={model.title}
              disabled={saving}
              onChange={this.updateModel((model, v) => model.title = v)}
            />

            <FieldSelect
              label='Categoria'
              validation='required'
              value={(model.category || {} as any).id}
              options={categories}
              disabled={saving || loading.category}
              loading={loading.category}
              onChange={this.updateModel((model, id) => model.category = { id })}
            />

            <FieldHtml
              label='Descrição'
              validation='required'
              multiline
              disabled={saving}
              value={model.description}
              onChange={this.updateModel((model, v) => model.description = v)}
            />

            <Grid container>
              <Grid item xs={true}>
                <FieldSelect
                  label='Autor'
                  validation='required'
                  options={authors}
                  value={(model.author || {} as any).id}
                  disabled={saving || loading.author}
                  loading={loading.author}
                  onChange={this.updateModel((model, id) => model.author = { id })}
                />
              </Grid>

              <Grid item xs={false}>
                <Button fullWidth size='small' className='button-margin-input' color='secondary' onClick={() => this.newAuthor()}>
                  <AccountPlusIcon />
                  <Hidden xsDown>
                    Autor
                  </Hidden>
                </Button>
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
    loading: { category: state.category.isFetching, author: state.author.isFetching },
    loadingError: state.category.error || state.author.error,
    saving: state.course.save.isSaving,
    savingError: state.course.save.error,
    lastCourseSaved: state.course.save.lastSaved,
    authors: state.author.authors.map(c => ({ value: c.id, label: c.name })),
    lastAuthorSaved: state.author.lastAuthorSave,
    categories: state.category.categories.map(c => ({ value: c.id, label: c.name }))
  };
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  openAuthorFormModal,
  requestCategoryList,
  requestAuthorList,
  requestCourseSave
})(EssentialFormStep);