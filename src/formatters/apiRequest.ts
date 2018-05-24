import snakeCase from 'lodash/snakeCase';

export function apiRequestFormatter<T extends { [key: string]: any }>(obj: T): T {
  if (!obj) return obj;

  if (Array.isArray(obj)) {
    return obj.map(i => apiRequestFormatter(i)) as any;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[snakeCase(key)] = apiRequestFormatter(obj[key]);
      return acc;
    }, {}) as any;
  }

  return obj;
}