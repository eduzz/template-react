import padStart from 'lodash/padStart';
import snakeCase from 'lodash/snakeCase';

export function apiRequestFormatter<T>(obj: T): T {
  if (!obj) return obj;

  if (Array.isArray(obj)) {
    return obj.map(i => apiRequestFormatter(i)) as any;
  }

  if (obj instanceof Date) {
    const year = obj.getFullYear();
    const month = padStart((obj.getMonth() + 1).toString(), 2, '0');
    const day = padStart(obj.getDate().toString(), 2, '0');

    return `${year}-${month}-${day}` as any;
  }

  if (typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[snakeCase(key)] = apiRequestFormatter(obj[key]);
      return acc;
    }, {}) as any;
  }

  return obj;
}