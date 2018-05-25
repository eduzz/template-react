import { fakeBoolean } from 'interfaces/types';

export function booleanToFake(value: boolean): fakeBoolean {
  return value ? '1' : value === false ? '0' : null;
}

export function fakeToBoolean(value: fakeBoolean): boolean {
  return value === '1' ? true : value === '0' ? false : null;
}