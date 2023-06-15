import { useState } from 'react';

import { Row, Col, Card } from 'antd';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

import { styled, StyledProp } from '@eduzz/houston-ui/styled';

const DashboardPage = ({ className }: StyledProp) => {
  const [data] = useState([
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
  ]);

  const [dataPie] = useState([
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 }
  ]);

  const [colors] = useState(['#0088FE', '#00C49F', '#FFBB28', '#FF8042']);

  return (
    <div className={className}>
      <Row className='grid'>
        <Col xs={12} md={4} lg={6}>
          <Card title='Bar Chart'>
            <ResponsiveContainer width='100%' height={150}>
              <BarChart data={data}>
                <Tooltip />
                <Bar dataKey='uv' fill={colors[0]} />
                <Bar dataKey='pv' fill={colors[1]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3}>
          <Card title='PieChart'>
            <ResponsiveContainer width='100%' height={150}>
              <PieChart>
                <Pie dataKey={'value'} data={dataPie}>
                  <Tooltip />
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3}>
          <Card title='Area Chart'>
            <ResponsiveContainer width='100%' height={150}>
              <AreaChart data={data}>
                <Area type='monotone' dataKey='uv' stroke='#FF8042' fill='#FF8042' />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card title='Line Chart'>
        <ResponsiveContainer width='100%' height={200}>
          <LineChart data={data}>
            <Tooltip />
            <Line type='monotone' dataKey='pv' stroke='#8884d8' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default styled(DashboardPage)`
  & .grid {
    margin-bottom: 15px;
  }
`;
