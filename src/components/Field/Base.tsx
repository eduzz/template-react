import { TextFieldProps } from '@material-ui/core/TextField';
import React, { PureComponent } from 'react';
import { validate } from 'validators';

import { FieldValidation, IFieldValidationContext } from '.';

export interface IStateFieldBase {
  touched: boolean;
  error: string;
}

export interface IPropsFieldBase extends TextFieldProps {
  label: string;
  disabled?: boolean;
  value?: any;
  submitted?: boolean;
  classes?: any;
  validation?: string;
  onChange: (value: any) => void;
}

export default abstract class FieldBase<P extends IPropsFieldBase, S extends IStateFieldBase = IStateFieldBase> extends PureComponent<P, S> {
  protected validationContext: IFieldValidationContext;

  constructor(props: any) {
    super(props);
    this.state = { touched: false, error: null } as any;
  }

  static getDerivedStateFromProps({ value, validation }: IPropsFieldBase, currentState: IStateFieldBase) {
    const error = validate(value, validation);

    return {
      ...currentState,
      error: error.message
    };
  }

  public isValid() {
    return !this.state.error;
  }

  public componentWillUnmount() {
    this.validationContext && this.validationContext.unbind(this);
  }

  public setContext(newContext: IFieldValidationContext): React.ReactNode {
    if (newContext === this.validationContext) return null;

    this.validationContext && this.validationContext.unbind(this);

    if (newContext) {
      this.validationContext = newContext;
      this.validationContext.bind(this);
    }

    return null;
  }

  public render() {
    return (
      <FieldValidation.Consumer>
        {context => this.setContext(context)}
      </FieldValidation.Consumer>
    );
  }

  protected onChange(value: any) {
    this.setState({ touched: true });
    this.props.onChange(value);
  }
}