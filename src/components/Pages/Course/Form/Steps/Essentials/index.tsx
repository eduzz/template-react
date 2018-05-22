import { Button, CardActions, CardContent, CircularProgress } from '@material-ui/core';
import ErrorMessage from 'components/ErrorMessage';
import { FieldSelect, FieldText, FieldValidation } from 'components/Field';
import { FormComponent, IStateForm } from 'components/FormComponent';
import Snackbar from 'components/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import { ICourse } from 'interfaces/course';
import { ChevronRightIcon } from 'mdi-react';
import React from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { requestCategoryList } from 'store/actionCreators/category';
import { cleanCourseSaveError, requestCourseSave } from 'store/actionCreators/course';

interface IState extends IStateForm<ICourse> {
  saving: boolean;
}

interface IProps {
  onComplete: Function;
}

interface IPropsFromConnect {
  loading: boolean;
  loadingError: any;
  saving: boolean;
  savingError: any;
  categories: { value: number, label: string }[];
  classes?: any;
  requestCategoryList?: typeof requestCategoryList;
  requestCourseSave?: typeof requestCourseSave;
  cleanCourseSaveError?: typeof cleanCourseSaveError;
}

@WithStyles({
  progressWrapper: {
    padding: '40px 0',
    textAlign: 'center'
  },
  progressButton: {
    marginLeft: 10
  },
  footer: {
    justifyContent: 'flex-end'
  }
})
class EssentialFormStep extends FormComponent<IProps & IPropsFromConnect, IState> {
  static getDerivedStateFromProps(nextProps: IProps & IPropsFromConnect, currentState: IState): IState {
    if (currentState.saving && !nextProps.saving && !nextProps.savingError) {
      //save completed
      nextProps.onComplete();
    }

    return {
      ...currentState,
      saving: nextProps.saving
    };
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    const isValid = await this.isFormValid();
    if (!isValid) return;

    this.props.requestCourseSave(this.state.model as any);
  }

  componentDidMount() {
    this.load();
  }

  load() {
    const { categories, requestCategoryList } = this.props;
    if (!categories.length) requestCategoryList();
  }

  render() {
    const { model, saving } = this.state;
    const { categories, loading, loadingError, savingError, classes, cleanCourseSaveError } = this.props;

    if (loading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress color='secondary' />
        </div>
      );
    }

    if (loadingError) {
      return (
        <ErrorMessage error={loadingError} tryAgain={() => this.load()} />
      );
    }

    return (
      <form onSubmit={this.onSubmit.bind(this)} noValidate>
        <Snackbar opened={!!savingError} error={savingError} onClose={() => cleanCourseSaveError()} />

        <FieldValidation.Provider value={this.registerFields}>
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
              disabled={saving}
              onChange={this.updateModel((model, id) => model.category = { id })}
            />

            <FieldText
              label='Descrição'
              multiline
              rows='4'
              disabled={saving}
              value={model.description}
              onChange={this.updateModel((model, v) => model.description = v)}
            />

          </CardContent>

          <CardActions className={classes.footer}>
            <Button type='submit' disabled={saving} color='secondary' className='icon-right'>
              {saving ? 'Salvando' : 'Próximo'}
              {saving ?
                <CircularProgress color='secondary' className={classes.progressButton} size={18} /> :
                <ChevronRightIcon />
              }
            </Button>
          </CardActions>
        </FieldValidation.Provider>
      </form>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}): IPropsFromConnect => {
  return {
    loading: state.category.isFetching,
    loadingError: state.category.error,
    saving: state.course.isSaving,
    savingError: state.course.saveError,
    categories: state.category.categories.map(c => ({ value: c.id, label: c.name }))
  };
};

export default connect<IPropsFromConnect, {}, IProps>(mapStateToProps, {
  requestCategoryList,
  requestCourseSave,
  cleanCourseSaveError
})(EssentialFormStep);