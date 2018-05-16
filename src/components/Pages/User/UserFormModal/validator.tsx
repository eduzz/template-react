import { BaseValidator } from 'validators/base';

export interface IUserValidatorResult {
  email: string;
  group: string;
}

export default class UserValidator extends BaseValidator<IUserValidatorResult> {
  constructor() {
    super({
      email: 'required|email',
      group: 'required'
    });
  }
}