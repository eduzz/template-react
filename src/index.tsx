import App from 'App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.unregister();
  });
}
