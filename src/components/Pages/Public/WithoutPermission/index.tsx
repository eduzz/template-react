import { Typography } from 'antd';

import { css, styled, StyledProps } from '@/styled';

const { Title } = Typography;

const WithoutPermission = ({ ...rest }: StyledProps) => {
  return (
    <div {...rest}>
      <Title level={3}>Sem permissão!</Title>
    </div>
  );
};

export default styled(WithoutPermission)(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3rem;
  `
);
