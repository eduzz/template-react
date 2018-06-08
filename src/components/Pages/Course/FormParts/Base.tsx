import { FormComponent, IStateForm } from 'components/FormComponent';

import { ICourseFormContext } from '.';

export default abstract class CourseFormBase<P= {}, S extends IStateForm = any> extends FormComponent<P, S>  {
  formContext: ICourseFormContext = null;

  abstract name: string;
  abstract doSave(): Promise<any>;
  abstract canSave(): { canSave: boolean, reason?: string };

  isFormValid(): boolean {
    return this.formContext.canSave();
  }

  setFormSubmitted() {
    this.setState({ formSubmitted: true });
  }

  setContext(newContext: ICourseFormContext): React.ReactNode {
    if (newContext === this.formContext) return null;

    this.formContext && this.formContext.unregister(this);

    if (newContext) {
      this.formContext = newContext;
      this.formContext.register(this);
    }

    return null;
  }

  componentWillUnmount() {
    this.formContext && this.formContext.unregister && this.formContext.unregister(this);
  }
}