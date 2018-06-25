import { FormComponent, IStateForm } from 'components/Abstract/Form';
import { ICourse } from 'interfaces/course';
import ValidationContext from 'material-ui-form-fields/components/ValidationContext';
import React from 'react';

import CourseFormBase from './Base';

export interface ICourseFormContext {
  register(component: CourseFormBase): void;
  unregister(component: CourseFormBase): void;
  canSave(): boolean;
}

export const CourseFormContext = React.createContext<ICourseFormContext>({
  register: () => null,
  unregister: () => null,
  canSave: () => true
});

interface IProps {
  onSubmit(manager: FormManager): void;
}

export default class FormManager extends FormComponent<IProps, IStateForm> {
  components: CourseFormBase[] = [];
  registerCurrentStepper: ICourseFormContext = {
    register: (component) => {
      this.components.push(component);
    },
    unregister: (component) => {
      this.components = this.components.filter(c => c !== component);
    },
    canSave: () => {
      return this.isFormValid();
    }
  };

  async trySave(): Promise<{ success: boolean, results?: ICourse[], reasons?: string[] }> {
    this.components.forEach(c => c.setFormSubmitted());

    if (!this.isFormValid()) {
      return { success: false, reasons: ['Revise os campos'] };
    }

    const status = this.components.map(component => {
      return { name: component.name, status: component.canSave() };
    });

    if (!status.every(s => s.status.canSave)) {
      return { success: false, reasons: status.filter(c => c.status.canSave).map(c => c.status.reason) };
    }

    try {
      const results = await Promise.all(this.components.map(c => c.doSave()));
      return { success: true, results };
    } catch (err) {
      return { success: false };
    }
  }

  onSubmit = (ev: Event) => {
    ev.preventDefault();
    this.props.onSubmit(this);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)} noValidate>
        <CourseFormContext.Provider value={this.registerCurrentStepper}>
          <ValidationContext ref={this.bindValidationContext.bind(this)}>
            {this.props.children}
          </ValidationContext>
        </CourseFormContext.Provider>
      </form>
    );
  }
}
