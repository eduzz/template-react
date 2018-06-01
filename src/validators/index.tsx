import validator from 'validatorjs';

const messages: any = {
  same: 'A confirmação não coincide.',
  confirmed: 'A confirmação não coincide.',
  after: 'Deve ser depois que :after.',
  after_or_equal: 'Deve ser igual ou depois que :after_or_equal.',
  email: 'Inválido',
  date: 'Inválido',
  in: 'Inválido',
  integer: 'Inválido',
  min: {
    numeric: 'Valor mínimo :min',
    string: 'Mínimo :min caracteres'
  },
  max: {
    numeric: 'Valor máximo :max',
    string: 'Máximo :max caracteres'
  },
  required: 'Obrigatório',
  required_if: 'Obrigatório se :other'
};

export function validate(value: any, rule: string, context: any = {}): { valid: boolean, message?: string } {
  if (!rule) return { valid: true };

  const result = new validator({ value, ...context }, { value: rule }, messages);

  if (result.passes()) {
    return { valid: true };
  }

  const allErrors = result.errors.all();
  return { valid: false, message: allErrors.value[0] };
}