import { DateTime } from 'luxon';

export function dateParse(value: any, format?: string): Date {
  if (!value) return value;
  if (value instanceof Date) return value;

  const date = format ?
    DateTime.fromFormat(value, format) :
    DateTime.fromISO(value);

  return date.toJSDate();
}

export function dateFormat(date: Date, format: string = 'D'): string {
  return DateTime.fromJSDate(date).toFormat(format);
}