import ConfigBuilder from '@react-form-fields/material-ui/config/builder';
import lang from '@react-form-fields/material-ui/lang/pt-br';

const fieldConfig = new ConfigBuilder()
  .fromLang(lang)
  .addMask('money', value => '$' + value, value => value.replace(/\D/gi, ''))
  .build();

export default fieldConfig;