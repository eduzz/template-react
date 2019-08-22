import cloneDeep from 'lodash/cloneDeep';

export type DeepReadonly<T> = T extends Array<any>
  ? ReadonlyArray<T[0]>
  : T extends Date
  ? T
  : T extends Function
  ? T
  : T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

export type Writable<T> = T extends ReadonlyArray<any>
  ? Array<WritableObject<T[0]>>
  : T extends Array<any>
  ? Array<WritableObject<T[0]>>
  : WritableObject<T>;

type WritableObject<T> = T extends Date
  ? T
  : T extends Function
  ? T
  : T extends object
  ? { -readonly [P in keyof T]: Writable<T[P]> }
  : T;

export function makeWritable<T>(data: T): Writable<T> {
  return cloneDeep(data) as any;
}
