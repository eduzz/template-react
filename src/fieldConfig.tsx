import ConfigBuilder from '@react-form-fields/material-ui/config/builder';
import lang from '@react-form-fields/material-ui/lang/pt-br';

const fieldConfig = new ConfigBuilder()
  .fromLang(lang)
  .setEditorConfig('pt', {
    inline: { options: ['bold', 'italic', 'underline'] },
    list: { options: ['unordered', 'ordered'] },
    embedded: { className: 'hide' },
    fontSize: { className: 'hide' },
    blockType: { className: 'hide' },
    remove: { className: 'hide' },
    colorPicker: { className: 'hide' },
    fontFamily: { className: 'hide' },
    textAlign: { className: 'hide' },
    emoji: { className: 'hide' }
  })
  .setValidationOn('onSubmit')
  .build();

export default fieldConfig;