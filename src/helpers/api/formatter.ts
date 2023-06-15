import dateIsValid from 'date-fns/isValid';
import dateFnsParse from 'date-fns/parse';

export function responseFormatter<T>(obj: T): T {
  if (!obj) return obj;

  if (Array.isArray(obj)) {
    return obj.map(i => responseFormatter(i)) as any;
  }

  if (typeof obj === 'string' && isValidDateString(obj)) {
    return dateParse(obj) as any;
  }

  if (typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = responseFormatter((obj as any)[key]);
      return acc;
    }, {} as any);
  }

  return obj;
}

function isValidDateString(value: any): boolean {
  return /^(\d{4})-(\d{2})-(\d{2})([T\s](\d{2}):(\d{2}):(\d{2})(\.(\d+)(Z)?)?)?$/.test(value);
}

export function dateParse(value: any, format: string | null = null): Date {
  if (!value) return value;
  if (value instanceof Date) return value;

  const date = !format ? new Date(value) : dateFnsParse(value, format, new Date());
  if (!dateIsValid(date)) return value;

  return date;
}
