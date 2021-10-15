import { useCallback, useState } from 'react';

import { CardContent } from '@mui/material';
import { useSelector } from 'react-redux';

import Button from '@eduzz/houston-ui/Button';
import Typography from '@eduzz/houston-ui/Typography';

import authService from '@/services/auth';
import { selectorIsAuthenticated } from '@/store/selectors';

const ReduxExample = () => {
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector(selectorIsAuthenticated);

  const onLogin = useCallback(async () => {
    setLoading(true);
    await authService.login('teste@eduzz.com', 'senha123');
    setLoading(false);
  }, []);

  const onLogout = useCallback(() => authService.logout(), []);

  return (
    <CardContent>
      <Typography marginBottom>Autênticado: {isAuthenticated ? 'Sim' : 'Não'}</Typography>
      <Button onClick={onLogin} loading={loading} disabled={loading}>
        Entrar
      </Button>
      &nbsp;
      <Button onClick={onLogout} disabled={loading}>
        Sair
      </Button>
    </CardContent>
  );
};

export default ReduxExample;
