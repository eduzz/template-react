import { createRoot } from 'react-dom/client';

import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.unregister();
  });
}
