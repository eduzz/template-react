import { useCallback } from 'react';

import { Result, Button } from 'antd';

const AppError = () => {
  const onRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <Result
      status={500}
      title='Um erro inesperado aconteceu'
      subTitle='Se o erro persistir contate o desenvolvedor'
      extra={
        <Button type='default' onClick={onRefresh}>
          Recarregar
        </Button>
      }
    />
  );
};

export default AppError;
