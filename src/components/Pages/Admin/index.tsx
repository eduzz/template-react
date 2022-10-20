import { useCallback, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import Layout from '@eduzz/houston-ui/Layout';

import { ScrollTopContext } from './scrollTopContext';

const { Sidebar, Topbar, Content } = Layout;
const { Item, Group } = Sidebar;

const AdminLayout = () => {
  const mainContent = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const scrollTop = useCallback(() => setTimeout(() => mainContent.current?.scrollTo(0, 0), 100), []);

  return (
    <ScrollTopContext.Provider value={scrollTop}>
      <Layout>
        <Topbar user={{ name: 'Eduzz' }} />

        <Sidebar currentLocation={location.pathname}>
          <Item as={NavLink} to='/dashboard'>
            Dashboard
          </Item>

          <Item as={NavLink} to='/sales'>
            Minhas vendas
          </Item>

          <Group label='Exemplo'>
            <Item as={NavLink} to='/schedules'>
              Agendamento
            </Item>
            <Item as={NavLink} to='/contracts'>
              Meus contratos
            </Item>
            <Item as={NavLink} to='/affiliates'>
              Meus afiliados
            </Item>
          </Group>
        </Sidebar>

        <Content>
          <main ref={mainContent}>
            <Outlet />
          </main>
        </Content>
      </Layout>
    </ScrollTopContext.Provider>
  );
};

export default AdminLayout;
