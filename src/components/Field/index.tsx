import React from 'react';

import FieldAutocompleteComponent from './Autocomplete';
import FieldBase from './Base';
import FieldCheckboxComponent from './Checkbox';
import FieldDateComponent from './Date';
import FieldRadioComponent from './Radio';
import FieldSelectComponent from './Select';
import FieldSwitchComponent from './Switch';
import FieldTextComponent from './Text';

export const FieldText = FieldTextComponent;
export const FieldSelect = FieldSelectComponent;
export const FieldRadio = FieldRadioComponent;
export const FieldCheckbox = FieldCheckboxComponent;
export const FieldSwitch = FieldSwitchComponent;
export const FieldDate = FieldDateComponent;
export const FieldAutocomplete = FieldAutocompleteComponent;

export interface IFieldValidationContext {
  bind: (field: FieldBase<any, any>) => void;
  unbind: (field: FieldBase<any, any>) => void;
}

export const FieldValidation = React.createContext<IFieldValidationContext>(null);