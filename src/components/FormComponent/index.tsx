import { IFieldValidationContext } from 'components/Field';
import FieldBase from 'components/Field/Base';
import { ChangeEvent, Component } from 'react';

export interface IStateForm<T = any> {
  model?: Partial<T>;
  validation?: { [key in keyof Partial<T>]: string; };
  formSubmitted?: boolean;
}

export abstract class FormComponent<P, S extends IStateForm> extends Component<P, S> {
  public registerFields: IFieldValidationContext = {
    bind: field => {
      this.fields.push(field);
    },
    unbind: field => {
      const index = this.fields.findIndex(f => f === field);
      this.fields.splice(index, 1);
    },
  };

  protected fields: FieldBase<any, any>[];

  constructor(props: any) {
    super(props);
    this.fields = [];
  }

  public async isFormValid(formSubmitted: boolean = true): Promise<boolean> {
    this.setState({ formSubmitted });

    if (!this.fields.length) {
      console.warn('There is no field registred, did you use FieldValidation.Provider?');
    }

    return this.fields.every(f => f.isValid());
  }

  public resetForm() {
    this.setState({ formSubmitted: false, model: {}, validation: {} });
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