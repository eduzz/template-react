import { BaseValidator } from 'validators/base';

export interface ILoginValidatorResult {
  username: string;
  password: string;
}

export default class LoginValidator extends BaseValidator<ILoginValidatorResult> {
  constructor() {
    super({
      username: 'required|email',
      password: 'required'
    });
  }
}