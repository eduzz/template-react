import { AtomEffect, DefaultValue } from 'recoil';

type AtomEffectParam<T> = Parameters<AtomEffect<T>>[0];
type AtomEffectOnSet<T> = (newValue: T, oldValue: T | DefaultValue) => void;

export class AtomServiceAdapter<T> {
  private onSetters: AtomEffectOnSet<T>[] = [];

  private currentValue: T;
  private effectParam: Promise<AtomEffectParam<T>>;
  private effectParamResolve: (value: AtomEffectParam<T>) => void;

  constructor(private onInit?: (param: AtomEffectParam<T>) => void) {
    this.effectParam = new Promise(resolve => (this.effectParamResolve = resolve));
  }

  connect = () => {
    return (param: AtomEffectParam<T>) => {
      param.onSet((newValue, oldValue) => this.sendNewValue(newValue, oldValue));

      this.onInit && this.onInit({ ...param, setSelf: this.setSelf, onSet: this.onSet });
      this.effectParamResolve(param);
    };
  };

  value = async () => {
    await this.effectParam;
    return this.currentValue;
  };

  setSelf = async (value: T, ignoreOnSet = false) => {
    const param = await this.effectParam;

    let oldValue: T | DefaultValue;
    param.setSelf(getOldValue => {
      oldValue = getOldValue;
      return value;
    });

    if (ignoreOnSet) return;
    this.sendNewValue(value, oldValue);
  };

  resetSelf = async () => {
    const param = await this.effectParam;
    param.resetSelf();
  };

  onSet = (callback: (newValue: T, oldValue: T | DefaultValue) => void) => {
    this.onSetters.push(callback);

    return () => {
      this.onSetters = this.onSetters.filter(onSet => onSet !== callback);
    };
  };

  private sendNewValue(newValue: T, oldValue: T | DefaultValue) {
    if (newValue === oldValue) return;

    this.currentValue = newValue;
    this.onSetters.forEach(onSet => onSet(newValue, oldValue));
  }
}
