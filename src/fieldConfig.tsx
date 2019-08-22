import ConfigBuilder from '@react-form-fields/material-ui/config/builder';
import lang from '@react-form-fields/material-ui/lang/pt-br';

const fieldConfig = new ConfigBuilder()
  .fromLang(lang)
  .setTrumbowygConfig({
    btns: [
      'viewHTML',
      ['h1', 'h2'],
      ['bold', 'italic', 'underline'],
      ['superscript', 'subscript'],
      'btnGrp-justify',
      'btnGrp-lists',
      ['horizontalRule'],
      ['removeformat'],
      ['fullscreen']
    ]
  })
  .build();

export default fieldConfig;
