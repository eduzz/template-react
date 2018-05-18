import { BaseValidator } from 'validators/base';

export interface IAccessGroupValidatorResult {
  email: string;
  group: number;
  course: number;
}

export default class AccessGroupValidator extends BaseValidator<IAccessGroupValidatorResult> {
  constructor() {
    super({
      email: 'required|email',
      group: 'required',
      course: 'required'
    });
  }
}