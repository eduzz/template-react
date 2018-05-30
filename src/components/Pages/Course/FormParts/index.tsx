import React, { PureComponent } from 'react';

export interface ICourseFormContext {
  register(component: ICourseFormPartComponent): void;
  unregister(component: ICourseFormPartComponent): void;
}

export interface ICourseFormPartComponent {
  askSave: Function;
}

export const CourseFormContext = React.createContext<ICourseFormContext>({
  register() { },
  unregister() { }
});

export default class FormManager extends PureComponent {
  steppers: ICourseFormPartComponent[] = [];
  registerCurrentStepper: ICourseFormContext = {
    register: (component) => {
      this.steppers.push(component);
    },
    unregister: (component) => {
      this.steppers = this.steppers.filter(s => s !== component);
    }
  };

  askSave() {
    this.steppers.forEach(s => s.askSave());
  }

  render() {
    return (
      <CourseFormContext.Provider value={this.registerCurrentStepper}>
        {this.props.children}
      </CourseFormContext.Provider>
    );
  }
}
