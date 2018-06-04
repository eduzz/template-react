import { setConfig } from 'material-ui-form-fields/dist/config';
import commonMasks from 'material-ui-form-fields/dist/mask/common/pt-br';
import { validate } from 'material-ui-form-fields/dist/validator';
import validationMessage from 'material-ui-form-fields/dist/validator/custom-languages/pt-br';

console.log(validate);

setConfig({
  masks: commonMasks,
  defaultDateLocale: 'pt-br',
  validation: validationMessage
});