import { memo, useCallback } from 'react';

import { UnorderedListOutlined } from '@ant-design/icons';
import { Space, Typography, Button, Row, Col, Modal } from 'antd';

import Filters from './Filters';
import List from './List';

const { Title, Text } = Typography;
const { confirm } = Modal;

const ReportsContent = (
  <>
    O relatório pode levar até 30 minutos para ficar pronto (dependendo do período solicitado), te notificaremos por
    e-mail.
    <br />
    <br />
    Os relatórios são gerados de acordo com o filtro abaixo, deseja continuar?
  </>
);

const Sales = () => {
  const handleClickReports = useCallback(() => {
    confirm({
      content: ReportsContent,
      title: 'Gerar relatório',
      okText: 'Continuar',
      onOk: () => console.log('OK'),
      onCancel: () => console.log('Cancel')
    });
  }, []);

  return (
    <Space direction='vertical' size='large'>
      <Row gutter={[0, 12]} align='middle' justify='space-between'>
        <Col xs={24} sm={18}>
          <Title level={2}>Minhas vendas</Title>
          <Text type='secondary'>Gerencie suas vendas.</Text>
        </Col>

        <Col>
          <Button onClick={handleClickReports} icon={<UnorderedListOutlined />}>
            Gerar relatórios
          </Button>
        </Col>
      </Row>

      <Filters />
      <List />
    </Space>
  );
};

export default memo(Sales);
