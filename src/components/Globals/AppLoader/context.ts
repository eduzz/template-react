import { createContext } from 'react';

interface AppLoaderContext {
  show(): void;
  error(error: any, tryAgain: () => void): void;
  hide(): void;
}

const AppLoaderContext = createContext<AppLoaderContext>({
  show: () => null,
  error: () => null,
  hide: () => null
});

export default AppLoaderContext;
