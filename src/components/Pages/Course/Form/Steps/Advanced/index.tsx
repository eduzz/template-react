import { CardContent } from '@material-ui/core';
import { FieldValidation } from 'components/Field';
import { FormComponent, IStateForm } from 'components/FormComponent';
import Snackbar from 'components/Snackbar';
import { ICourse } from 'interfaces/course';
import React from 'react';

interface IProps {
  onComplete: Function;
}

interface IState extends IStateForm<ICourse> {
  saving: boolean;
}

interface IPropsFromConnect {
  savingError?: any;
}

export default class AdvancedFormStep extends FormComponent<IProps & IPropsFromConnect, IState> {
  async onSubmit(event: Event) {
    event.preventDefault();

    const isValid = await this.isFormValid();
    if (!isValid) return;

    // this.props.requestCourseSave(this.state.model as any);
  }

  render() {
    const { savingError } = this.props;

    return (
      <form onSubmit={this.onSubmit.bind(this)} noValidate>
        <Snackbar opened={!!savingError} error={savingError} onClose={() => { }} />

        <FieldValidation.Provider value={this.registerFields}>
          <CardContent>
          </CardContent>
        </FieldValidation.Provider>
      </form>
    );
  }
}