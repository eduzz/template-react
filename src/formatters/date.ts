import { DateTime } from 'luxon';

export function dateParse(value: any, format?: string): Date {
  if (!value) return value;
  if (value instanceof Date) return value;

  if (!format) {
    return new Date(value);
  }

  return DateTime.fromFormat(value, format).toJSDate();
}

export function dateFormat(date: Date, format: string = 'D'): string {
  return DateTime.fromJSDate(date).toFormat(format);
}