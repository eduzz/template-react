import ValidationContext from 'material-ui-form-fields/components/ValidationContext';
import { Component } from 'react';

export interface IStateForm<T = any> {
  model?: Partial<T>;
  formSubmitted?: boolean;
}

export abstract class FormComponent<P, S extends IStateForm> extends Component<P, S> {
  protected validationContext: ValidationContext;
  protected scrollTop: Function;

  constructor(props: any) {
    super(props);
    this.state = { model: {} } as any;
  }

  public bindScrollTop(scrollTop: Function): React.ReactNode {
    this.scrollTop = scrollTop;
    return null;
  }

  public bindValidationContext(validationContext: ValidationContext): void {
    this.validationContext = validationContext;
  }

  public async isFormValid(formSubmitted: boolean = true): Promise<boolean> {
    const isValid = this.validationContext.isValid(formSubmitted);

    if (!isValid && this.scrollTop) {
      this.scrollTop();
      // Snackbar.show('Revise os campos');
    }

    return isValid;
  }

  public resetForm() {
    this.setState({ model: {}, formSubmitted: false });
    this.validationContext.reset();
  }

  protected updateModel(handler: (model: S['model'], value: any) => void): (value: any) => void {
    return (value: any) => {
      const { model } = this.state;

      handler(model, value);

      this.setState({ model });
    };
  }

}