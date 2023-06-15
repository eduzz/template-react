export function formatCPF(value: string | null | undefined) {
  if (!value) return '';

  const regexp = /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2}).*/;
  const result = '$1.$2.$3-$4';

  return value
    .replace(regexp, result)
    .replace(/[-./]$/, '')
    .replace(/[-./]$/, '')
    .replace(/[-./]$/, '');
}

export function formatCNPJ(value: string | null | undefined) {
  if (!value) return '';

  const regexp = /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2}).*/;
  const result = '$1.$2.$3/$4-$5';

  return value
    .replace(regexp, result)
    .replace(/[-./]$/, '')
    .replace(/[-./]$/, '')
    .replace(/[-./]$/, '');
}

export function formatDocument(value: string | null | undefined) {
  if (!value) return '';
  return value.length > 11 ? formatCNPJ(value) : formatCPF(value);
}
