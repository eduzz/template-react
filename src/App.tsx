import { memo, useMemo, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import themes from 'assets/theme';
import ThemeContext, { IThemeContext, ThemesTypes } from 'assets/theme/context';
import Alert from 'components/Globals/Alert';
import Loader from 'components/Globals/Loader';
import Pages from 'components/Pages';
import { Provider } from 'react-redux';

import ThemeProvider from '@eduzz/houston-ui/styles/ThemeProvider';

import { store } from './store';

const App = memo(() => {
  const [currentTheme, setCurrentTheme] = useState<ThemesTypes>(
    (localStorage.getItem('app-theme') ?? 'light') as ThemesTypes
  );

  const themeContext = useMemo<IThemeContext>(() => {
    return {
      currentTheme,
      toogleTheme: () => {
        const newTheme: ThemesTypes = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('app-theme', newTheme);
        setCurrentTheme(newTheme);
      }
    };
  }, [currentTheme]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemeContext.Provider value={themeContext}>
          <MuiThemeProvider theme={themes[themeContext.currentTheme]}>
            <CssBaseline />

            <Loader />
            <Alert />

            <Pages />
          </MuiThemeProvider>
        </ThemeContext.Provider>
      </ThemeProvider>
    </Provider>
  );
});

export default App;
