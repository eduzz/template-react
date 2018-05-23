import moment from 'moment';

export function dateParseObj<T extends { [key: string]: any }>(obj: T): T {
  if (!obj) return obj;

  if (Array.isArray(obj)) {
    return obj.map(i => dateParseObj(i)) as any;
  }

  if (typeof obj === 'string' && isValidDateString(obj)) {
    return moment(obj).toDate() as any;
  }

  if (typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      obj[key] = dateParseObj(obj[key]);
    });
    return obj;
  }

  return obj;
}

export function dateParse(value: any, format?: string): Date {
  if (!value) return value;
  if (value instanceof Date) return value;

  const date = moment(value, format);
  if (!date.isValid()) return value;

  return date.toDate();
}

export function dateFormat(date: Date, format: string = 'DD/MM/YY'): string {
  return moment(date).format(format).replace('-feira', '');
}

export function dateHumanize(date: any): string {
  const now = moment();
  date = moment(date);

  return now.isSame(date, 'day') ?
    `${date.format('HH:mm')} - ${moment.duration(now.diff(date)).humanize()}` :
    now.isSame(date, 'year') ?
      date.format('DD/MMM [às] HH:mm') :
      date.format('DD/MMM/YYYY [às] HH:mm');
}

function isValidDateString(value: any): boolean {
  return /^(\d{4})-(\d{2})-(\d{2})([T\s](\d{2}):(\d{2}):(\d{2})(\.(\d+)Z)?)?$/.test(value);
}