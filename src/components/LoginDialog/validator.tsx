import { BaseValidator } from 'validators/base';

export interface ILoginValidatorResult {
  email: string;
  password: string;
}

export default class LoginValidator extends BaseValidator<ILoginValidatorResult> {
  constructor() {
    super({
      email: 'required|email',
      password: 'required'
    });
  }
}