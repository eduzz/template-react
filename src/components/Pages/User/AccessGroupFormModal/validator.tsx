import { IAccessGroup } from 'interfaces/accessGroup';
import { BaseValidator, IValidatorResult } from 'validators/base';

export interface IAccessGroupValidatorResult {
  name: string;
  modules: IAccessGroup['modules'][];
}

export default class AccessGroupValidator extends BaseValidator<IAccessGroupValidatorResult> {
  public validate(model: IAccessGroupValidatorResult): Promise<IValidatorResult<IAccessGroupValidatorResult>> {
    // const typeRules: any = {
    //   text: 'string',
    //   email: 'string|email',
    //   phone: 'string',
    //   date: 'date',
    //   zipcode: 'string|zipcode',
    //   number: 'number',
    //   boolean: 'boolean',
    //   chooseOne: 'string',
    //   multiple: 'string',
    // };

    return super.validate(model);
  }
}