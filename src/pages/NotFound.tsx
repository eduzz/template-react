import { NavLink } from 'react-router-dom';

import { Result, Button } from 'antd';

const NotFound = () => {
  return (
    <Result
      status={404}
      title='Página não encontrada'
      extra={
        <NavLink to='/'>
          <Button type='default'>Ir para o Dashboard</Button>
        </NavLink>
      }
    />
  );
};

export default NotFound;
