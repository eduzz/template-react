import { createContext } from 'use-context-selector';

export interface IDrawerContext {
  open(): void;
  close(): void;
  toogle(): void;
  isFull: boolean;
  isTemporary: boolean;
}

export const DrawerContext = createContext<IDrawerContext>(null);
