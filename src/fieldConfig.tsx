import { setConfig } from 'material-ui-form-fields/config';
import commonMasks from 'material-ui-form-fields/mask/common/pt-br';
import validationMessage from 'material-ui-form-fields/validator/custom-languages/pt-br';

setConfig({
  masks: commonMasks,
  defaultDateLocale: 'pt-br',
  validation: validationMessage
});