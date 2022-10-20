import { Typography } from 'antd';

import { css, styled, StyledProps } from '@/styled';

const { Title } = Typography;

const NotFoundPage = ({ ...rest }: StyledProps) => {
  return (
    <div {...rest}>
      <Title level={3}>Página não encontrada</Title>
    </div>
  );
};

export default styled(NotFoundPage)(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3rem;
  `
);
