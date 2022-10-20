import { useEffect, useMemo, useState } from 'react';

import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Drawer, Dropdown, Menu, Table } from 'antd';

import { ColumnsType } from 'antd/lib/table';
import format from 'date-fns/format';

import useBoolean from '@eduzz/houston-hooks/useBoolean';

import { SalesListItem } from '@/interfaces/sales';

const item: SalesListItem = {
  id: 1,
  created_at: new Date(),
  invoice: 123456,
  client: 'John Doe',
  product: 'Do mil ao milhão',
  affiliate: '-',
  utm: '-',
  gain: 100.99
};

export default function SalesList() {
  const [loading, , , toFalse] = useBoolean(true);
  const [modalDetails, handleToggleQuickview] = useBoolean(false);
  const [items, setItems] = useState<SalesListItem[]>([]);

  const TableActions = useMemo(
    () => (
      <Menu>
        <Menu.Item onClick={handleToggleQuickview}>Ver detalhes</Menu.Item>
        <Menu.Item>Reembolsar</Menu.Item>
        <Menu.Divider />
        <Menu.Item>Remover</Menu.Item>
      </Menu>
    ),
    [handleToggleQuickview]
  );

  const columns: ColumnsType<SalesListItem> = [
    {
      title: 'Criação',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: true,
      width: 200,
      render: value =>
        value && (
          <>
            {format(value, 'dd/MM/yyyy')} <br /> {format(value, 'HH:mm')}
          </>
        )
    },
    {
      title: 'Fatura',
      dataIndex: 'invoice',
      key: 'invoice'
    },
    {
      title: 'Cliente',
      dataIndex: 'client',
      key: 'client'
    },
    {
      title: 'Produto',
      dataIndex: 'product',
      key: 'client',
      width: 400
    },
    {
      title: 'Afiliado',
      dataIndex: 'affiliate',
      key: 'affiliate'
    },
    {
      title: 'UTM',
      dataIndex: 'utm',
      key: 'utm'
    },
    {
      title: 'Ganho',
      dataIndex: 'gain',
      sorter: true,
      key: 'gain',
      render: value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    },
    {
      title: 'Ações',
      key: 'action',
      width: 50,
      render: () => (
        <Dropdown overlay={TableActions} trigger={['click']}>
          <Button shape='circle' type='text'>
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      )
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setItems(new Array(10).fill(item));
      toFalse();
    }, 2000);
  }, [toFalse]);

  return (
    <div className='sales-table'>
      <Table
        locale={{ emptyText: loading ? 'Carregando...' : 'Sem dados' }}
        loading={loading}
        dataSource={items}
        columns={columns}
        pagination={{
          responsive: true,
          showTotal: (total, range) => `Exibindo ${range[0]} até ${range[1]} de ${total} faturas`
        }}
      />

      <Drawer title='Detalhes Fatura' placement='right' onClose={handleToggleQuickview} open={modalDetails}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}
