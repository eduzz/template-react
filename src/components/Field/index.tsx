import React from 'react';

import FieldAutocompleteComponent from './Autocomplete';
import FieldBase from './Base';
import FieldDateComponent from './Date';
import FieldSelectComponent from './Select';
import FieldTextComponent from './Text';

export const FieldText = FieldTextComponent;
export const FieldSelect = FieldSelectComponent;
export const FieldDate = FieldDateComponent;
export const FieldAutocomplete = FieldAutocompleteComponent;

export interface IFieldValidationContext {
  bind: (field: FieldBase<any, any>) => void;
  unbind: (field: FieldBase<any, any>) => void;
}

export const FieldValidation = React.createContext<IFieldValidationContext>(null);