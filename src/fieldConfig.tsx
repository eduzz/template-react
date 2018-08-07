import commonMasks from '@react-form-fields/core/mask/common/pt-br';
import validationMessage from '@react-form-fields/core/validator/custom-languages/pt-br';
import { setConfig } from '@react-form-fields/material-ui/config';

setConfig({
  masks: commonMasks,
  dateLocale: 'pt',
  validation: validationMessage
});