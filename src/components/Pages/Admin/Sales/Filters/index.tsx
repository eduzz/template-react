import { memo, useCallback } from 'react';

import { ControlOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Col, Form, Row, Select, Input, Button, Space, Divider, Modal } from 'antd';

import useBoolean from '@eduzz/houston-hooks/useBoolean';

import RangePicker from '@/components/Shared/RangePicker';
import { DateType, InvoiceStatus, ProducerType } from '@/enums/sales';
import { FilterValues } from '@/interfaces/sales';

const SalesFilters = () => {
  const [advancedFilters, toggleAdvancedFilters] = useBoolean();

  const [form] = Form.useForm<FilterValues>();

  const onFinish = useCallback((values: FilterValues) => console.log(values), []);

  const handleChangeProducerType = useCallback(() => form.resetFields(['producer_value']), [form]);

  return (
    <div className='sales-filters'>
      <Space direction='vertical' size='small'>
        <Form<FilterValues>
          form={form}
          layout='vertical'
          onFinish={onFinish}
          initialValues={{
            date_type: 1,
            producer_type: 1,
            status_invoice: [1, 2]
          }}
        >
          <Row align='middle' gutter={24}>
            <Col xs={24} sm={24} md={12}>
              <Row gutter={8}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label='Tipo de data' name='date_type'>
                    <Select>
                      <Select.Option value={DateType.CREATED}>Criação</Select.Option>
                      <Select.Option value={DateType.CLICK}>Clique</Select.Option>
                      <Select.Option value={DateType.CREDIT}>Crédito</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={16}>
                  <Form.Item label='Período' name='period'>
                    <RangePicker placeholder={['Data início', 'Data término']} format='dd/MM/yyyy' />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col xs={24} md={12}>
              <Row gutter={8}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label='Cliente' name='producer_type'>
                    <Select onChange={handleChangeProducerType}>
                      <Select.Option value={ProducerType.EMAIL}>E-mail</Select.Option>
                      <Select.Option value={ProducerType.NAME}>Nome</Select.Option>
                      <Select.Option value={ProducerType.ID}>ID</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={16}>
                  <Form.Item<FilterValues>
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.producer_type !== currentValues.producer_type
                    }
                  >
                    {({ getFieldValue }) => {
                      switch (getFieldValue('producer_type')) {
                        case ProducerType.NAME:
                          return (
                            <Form.Item label='Nome' name='producer_value'>
                              <Input placeholder='Ex: John Doe' />
                            </Form.Item>
                          );

                        case ProducerType.ID:
                          return (
                            <Form.Item label='ID' name='producer_value'>
                              <Input placeholder='Ex: 123' />
                            </Form.Item>
                          );

                        default:
                          return (
                            <Form.Item label='E-mail' name='producer_value'>
                              <Input placeholder='Ex: johndoe@eduzz.com' />
                            </Form.Item>
                          );
                      }
                    }}
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col xs={24} md={6}>
              <Form.Item label='Produto' name='products'>
                <Select
                  mode='multiple'
                  showArrow
                  suffixIcon={<SearchOutlined />}
                  maxTagCount='responsive'
                  optionFilterProp='label'
                  maxTagTextLength={8}
                  placeholder='Selecione produtos'
                  maxTagPlaceholder={products => `+${products.length} produto(s)...`}
                  options={[
                    { label: 'Do mil ao milhão', value: 1 },
                    { label: 'Como perder 20kg em 10 dias', value: 2 },
                    { label: 'Consultoria', value: 3 }
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Form.Item label='Fatura' name='invoice'>
                <Input placeholder='Ex: 12345' />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item label='Status da fatura' name='status_invoice'>
                <Select placeholder='Aberta, Paga...' mode='multiple' maxTagCount='responsive' showArrow>
                  <Select.Option value={InvoiceStatus.OPEN}>Aberta</Select.Option>
                  <Select.Option value={InvoiceStatus.PAID}>Paga</Select.Option>
                  <Select.Option value={InvoiceStatus.CANCELED}>Cancelada</Select.Option>
                  <Select.Option value={InvoiceStatus.DUPLICATED}>Duplicada</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={4}>
              <Button icon={<FilterOutlined />} type='primary' htmlType='submit' block>
                Filtrar
              </Button>
            </Col>
          </Row>
        </Form>

        <Divider>
          <Button onClick={toggleAdvancedFilters} icon={<ControlOutlined />}>
            Filtros avançados
          </Button>
        </Divider>
      </Space>

      <Modal
        title='Filtros avançados'
        open={advancedFilters}
        onOk={toggleAdvancedFilters}
        onCancel={toggleAdvancedFilters}
        okText='Filtrar'
        cancelText='Cancelar'
        width={800}
        centered
      >
        ...
      </Modal>
    </div>
  );
};

export default memo(SalesFilters);
