import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@eduzz/ui-antd-theme';

import Analytics from '@/configs/Analytics';
import Pages from '@/pages';

import './index.css';
import QueryConfig from './configs/Query';

const App = () => {
  return (
    <ThemeProvider brandColor='orbita'>
      <QueryConfig>
        <Analytics />

        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </QueryConfig>
    </ThemeProvider>
  );
};

export default App;
