import { FormComponent } from 'components/FormComponent';

import { IStepComponent, IStepContext } from '.';

export default abstract class StepBase<P, S> extends FormComponent<P, S> implements IStepComponent {
  stepContext: IStepContext = null;

  abstract askSave(): void;

  setContext(newContext: IStepContext): React.ReactNode {
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