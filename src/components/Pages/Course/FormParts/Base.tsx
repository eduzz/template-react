import { FormComponent } from 'components/FormComponent';

import { ICourseFormContext, ICourseFormPartComponent } from '.';

export default abstract class CourseFormBase<P, S> extends FormComponent<P, S> implements ICourseFormPartComponent {
  stepContext: ICourseFormContext = null;

  abstract askSave(): void;

  setContext(newContext: ICourseFormContext): React.ReactNode {
    if (newContext === this.stepContext) return null;

    this.stepContext && this.stepContext.unregister(this);

    if (newContext) {
      this.stepContext = newContext;
      this.stepContext.register(this);
    }

    return null;
  }

  componentWillUnmount() {
    this.stepContext && this.stepContext.unregister && this.stepContext.unregister(this);
  }
}