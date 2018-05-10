import moment from 'moment';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';

require('./global.css');

moment.locale('pt-BR');

ReactDOM.render(
  <Root />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
