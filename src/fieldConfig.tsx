import { setConfig } from '@react-form-fields/material-ui/config';
import commonMasks from '@react-form-fields/material-ui/mask/common/pt-br';
import validationMessage from '@react-form-fields/material-ui/validator/custom-languages/pt-br';

setConfig({
  masks: commonMasks,
  defaultDateLocale: 'pt-br',
  validation: validationMessage
});