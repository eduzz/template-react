import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const PermissionRoute = memo<Props>(({ children }) => {
  const navigate = useNavigate();

  const isAuthenticated = true;

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return <>{children}</>;
});

export default PermissionRoute;
