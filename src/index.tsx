import '@eduzz/houston-forms/yupLocale';
import './assets/global.css';

import * as ReactDOM from 'react-dom';
import logService from 'services/log';

import setHoustonHooksConfig from '@eduzz/houston-hooks/config';

import App from './App';

setHoustonHooksConfig({
  onUnhandledError: err => logService.handleError(err)
});

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.unregister();
  });
}
