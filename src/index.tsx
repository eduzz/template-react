import '@eduzz/houston-forms/yupLocale';

import { createRoot } from 'react-dom/client';

import setHoustonHooksConfig from '@eduzz/houston-hooks/config';

import App from './App';

import logService from '@/services/log';

setHoustonHooksConfig({
  onUnhandledError: err => logService.handleError(err)
});

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.unregister();
  });
}
