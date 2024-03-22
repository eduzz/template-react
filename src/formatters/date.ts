import { format } from 'date-fns/format';

export function formatDate(date: Date | null | undefined) {
  if (!date) return '';
  return format(date, 'dd/MM/yyyy');
}

export function formatDateTime(date: Date | null | undefined) {
  if (!date) return '';
  return format(date, 'dd/MM/yyyy HH:mm');
}
