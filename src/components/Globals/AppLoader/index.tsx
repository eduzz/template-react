import './index.css';

import { lazy, Suspense, useMemo, useState } from 'react';

import { createRoot } from 'react-dom/client';

import logo from '@/assets/images/logo.svg';
import errorFormatter from '@/formatters/error';

import AppLoaderContext from './context';

const App = lazy(() => import('@/App'));

const Loader = () => {
  const [show, setShow] = useState(true);
  const [error, setError] = useState<{ message: string; tryAgain: () => void } | null>(null);

  const contextValue = useMemo<AppLoaderContext>(
    () => ({
      show: () => setShow(true),
      error: (error, tryAgain) =>
        setError({
          message: errorFormatter(error),
          tryAgain: () => {
            tryAgain();
            setError(null);
          }
        }),
      hide: () => setShow(false)
    }),
    []
  );

  return (
    <>
      <AppLoaderContext.Provider value={contextValue}>
        <Suspense>
          <App />
        </Suspense>
      </AppLoaderContext.Provider>

      <div className={`root-app-loader ${show ? '--show' : ''} ${error ? '--error' : ''}`}>
        <div>
          {error ? (
            <>
              <p className='root-app-error-message'>
                Não conseguimos carregar a aplicação
                <small>{error.message}</small>
              </p>

              {error.tryAgain && (
                <button onClick={error.tryAgain} className='root-app-error-button'>
                  Tentar Novamente
                </button>
              )}
            </>
          ) : (
            <>
              <img src={logo} className='root-app-logo' />

              <div className='root-app-loader-line'>
                <div />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Loader;

export function init() {
  const container = document.getElementById('app');
  const root = createRoot(container as HTMLElement);

  root.render(<Loader />);
}
