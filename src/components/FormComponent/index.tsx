import { IFieldValidationContext } from 'components/Field';
import FieldBase from 'components/Field/Base';
import Snackbar from 'components/Snackbar';
import { Component } from 'react';

export interface IStateForm<T = any> {
  model?: Partial<T>;
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

  protected scrollTop: Function;
  protected fields: FieldBase<any, any>[];

  constructor(props: any) {
    super(props);
    this.fields = [];
    this.state = { model: {} } as any;
  }

  public bindScrollTop(scrollTop: Function): React.ReactNode {
    this.scrollTop = scrollTop;
    return null;
  }

  public async isFormValid(formSubmitted: boolean = true): Promise<boolean> {
    this.fields.forEach(f => f.serFormSubmitted(formSubmitted));
    this.setState({ formSubmitted });

    if (!this.fields.length) {
      console.warn('There is no field registred, did you use FieldValidation.Provider?');
    }

    const isValid = this.fields.every(f => f.isValid());
    if (!isValid && this.scrollTop) {
      this.scrollTop();
      Snackbar.show('Revise os campos');
    }

    return isValid;
  }

  public resetForm() {
    this.setState({ model: {}, formSubmitted: false });
    this.fields.forEach(f => f.serFormSubmitted(false));
  }

  protected updateModel(handler: (model: S['model'], value: any) => void): (value: any) => void {
    return (event: any) => {
      let { model } = this.state;
      let value = event;

      if ((event || {} as any).target) {
        value = event.target.type === 'checkbox' ?
          event.target.checked :
          event.target.value;
      }

      handler(model, value);

      this.setState({ model });
    };
  }

}