import { AtomEffect, DefaultValue } from 'recoil';

type AtomEffectParam<T> = Parameters<AtomEffect<T>>[0];
type AtomEffectOnSet<T> = (newValue: T, oldValue: T | DefaultValue) => void;

export class AtomServiceAdapter<T> {
  private watchers: AtomEffectOnSet<T>[] = [];

  private currentValue: T;
  private effectParam: Promise<AtomEffectParam<T>>;
  private effectParamResolve: (value: AtomEffectParam<T>) => void;

  constructor(private onInit?: (param: AtomEffectParam<T>) => void) {
    this.effectParam = new Promise(resolve => (this.effectParamResolve = resolve));
  }

  public effect = () => {
    return (param: AtomEffectParam<T>) => {
      param.onSet((newValue, oldValue) => this.onValueChange(newValue, oldValue));

      this.onInit && this.onInit({ ...param, setSelf: this.set, onSet: this.watch });
      this.effectParamResolve(param);
    };
  };

  public get = async () => {
    await this.effectParam;
    return this.currentValue;
  };

  public set = async (value: T | ((oldValue: T | DefaultValue) => T)) => {
    const { setSelf } = await this.effectParam;

    let newValue: T;
    let previous: T | DefaultValue;
    setSelf(current => {
      previous = current;
      newValue = typeof value === 'function' ? (value as any)(previous) : value;
      return newValue;
    });

    this.onValueChange(newValue, previous);
  };

  public watch = (callback: (newValue: T, oldValue: T | DefaultValue) => void) => {
    this.watchers.push(callback);

    return () => {
      this.watchers = this.watchers.filter(onSet => onSet !== callback);
    };
  };

  private onValueChange(newValue: T, oldValue: T | DefaultValue) {
    if (newValue === oldValue) return;

    this.currentValue = newValue;
    this.watchers.forEach(onSet => onSet(newValue, oldValue));
  }
}
