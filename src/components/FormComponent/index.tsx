import { ChangeEvent, Component } from 'react';
import { BaseValidator } from 'validators/base';

export interface IStateForm<T = any> {
  model?: Partial<T>;
  validation?: { [key in keyof Partial<T>]: string; };
  formSubmitted?: boolean;
}

export abstract class FormComponent<P, S extends IStateForm> extends Component<P, S> {
  protected abstract validator: BaseValidator<S['model']>;

  public async isFormValid(formSubmitted: boolean = true): Promise<boolean> {
    const { errors, valid } = await this.validator.validate(this.state.model);
    this.setState({ validation: errors, formSubmitted });

    return valid;
  }

  public resetForm() {
    this.setState({ formSubmitted: false, model: {}, validation: {} });
  }

  public getErrorMessage(key: string): string {
    return (this.state.validation || {})[key];
  }

  protected updateModel(handler: (model: S['model'], value: any) => void): any {
    return (event: ChangeEvent<any>) => {
      let { model, formSubmitted } = this.state as any;
      handler(model, (event || {} as any).target ? event.target.value : event);

      this.setState({ model });
      this.isFormValid(formSubmitted);
    };
  }

}