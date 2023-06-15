export function formatBoolean(value: boolean | null | undefined, trueString = 'Sim', falseString = 'Não') {
  return value === true ? trueString : value === false ? falseString : '-';
}
