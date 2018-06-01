import React from 'react';

import FieldAutocompleteComponent from './Autocomplete';
import FieldBase from './Base';
import FieldCheckboxComponent from './Checkbox';
import FieldColorComponent from './Color';
import FieldDateComponent from './Date';
import FieldHtmlComponent from './Html';
import FieldRadioComponent from './Radio';
import FieldSelectComponent from './Select';
import FieldSwitchComponent from './Switch';
import FieldTextComponent from './Text';

export const FieldColor = FieldColorComponent;
export const FieldText = FieldTextComponent;
export const FieldSelect = FieldSelectComponent;
export const FieldRadio = FieldRadioComponent;
export const FieldCheckbox = FieldCheckboxComponent;
export const FieldSwitch = FieldSwitchComponent;
export const FieldDate = FieldDateComponent;
export const FieldAutocomplete = FieldAutocompleteComponent;
export const FieldHtml = FieldHtmlComponent;

export interface IFieldValidationContext {
  bind: (field: FieldBase<any, any>) => void;
  unbind: (field: FieldBase<any, any>) => void;
}

export const FieldValidation = React.createContext<IFieldValidationContext>(null);