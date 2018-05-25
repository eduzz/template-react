import React from 'react';

export interface IStepContext {
  register(component: IStepComponent): void;
  unregister(component: IStepComponent): void;
}

export interface IStepComponent {
  askSave: Function;
}

export const StepContext = React.createContext<IStepContext>({
  register() { },
  unregister() { }
});