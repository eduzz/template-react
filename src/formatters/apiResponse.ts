import camelCase from 'lodash/camelCase';
import moment from 'moment';

export function apiResponseFormatter<T extends { [key: string]: any }>(obj: T): T {
  if (!obj) return obj;

  if (Array.isArray(obj)) {
    return obj.map(i => apiResponseFormatter(i)) as any;
  }

  if (typeof obj === 'string' && isValidDateString(obj)) {
    return moment(obj).toDate() as any;
  }

  if (typeof obj === 'string' && !isNaN(Number(obj))) {
    return Number(obj) as any;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[camelCase(key)] = apiResponseFormatter(obj[key]);
      return acc;
    }, {}) as any;
  }

  return obj;
}

function isValidDateString(value: any): boolean {
  return /^(\d{4})-(\d{2})-(\d{2})([T\s](\d{2}):(\d{2}):(\d{2})(\.(\d+)Z)?)?$/.test(value);
}