const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2
});

export function formatMoney(value: string | number) {
  return formatter.format(Number(value));
}
