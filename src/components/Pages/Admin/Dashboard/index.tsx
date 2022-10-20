import { Typography } from 'antd';

import { css, styled, StyledProps } from '@/styled';

const { Title } = Typography;

const Dashboard = ({ ...rest }: StyledProps) => {
  return (
    <div {...rest}>
      <Title level={3}>Dashboard</Title>
    </div>
  );
};

export default styled(Dashboard)(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3rem;
  `
);
