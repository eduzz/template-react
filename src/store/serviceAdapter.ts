import { AtomEffect, DefaultValue } from 'recoil';

type AtomEffectParam<T> = Parameters<AtomEffect<T>>[0];
type AtomEffectOnSet<T> = (newValue: T, oldValue: T | DefaultValue) => void;

export class AtomServiceAdapter<T> {
  private onSetters: AtomEffectOnSet<T>[] = [];

  private currentValue: T;
  private effectParam: Promise<AtomEffectParam<T>>;
  private effectParamResolve: (value: AtomEffectParam<T>) => void;

  constructor(onInit?: (param: AtomEffectParam<T>) => void) {
    this.effectParam = new Promise(resolve => (this.effectParamResolve = resolve));
    this.effectParam.then(param => onInit && onInit({ ...param, onSet: this.onSet }));
  }

  public connect() {
    return (param: AtomEffectParam<T>) => {
      param.onSet((newValue, oldValue) => {
        this.currentValue = newValue;
        this.onSetters.forEach(onSet => onSet(newValue, oldValue));
      });
      this.effectParamResolve(param);
    };
  }

  public async value() {
    await this.effectParam;
    return this.currentValue;
  }

  public async setSelf(value: Parameters<AtomEffectParam<T>['setSelf']>[0]) {
    const param = await this.effectParam;
    param.setSelf(value);
  }

  public async resetSelf() {
    const param = await this.effectParam;
    param.resetSelf();
  }

  public async onSet(callback: (newValue: T, oldValue: T | DefaultValue) => void) {
    this.onSetters.push(callback);

    return () => {
      this.onSetters = this.onSetters.filter(onSet => onSet !== callback);
    };
  }
}
