import { NavLink, Route, Routes, useLocation } from 'react-router-dom';

import Layout from '@eduzz/ui-layout';

import AuthRequired from '@/components/Globals/AuthRequired';
import useAuthStore from '@/stores/auth';

import Dashboard from './Dashboard';
import NotFound from './NotFound';

const { Sidebar, Content, Topbar } = Layout;

const Index = () => {
  const location = useLocation();
  const currentuUser = useAuthStore(state => state.currentUser());

  return (
    <Layout>
      <Topbar currentApplication='orbita' user={currentuUser}>
        <Topbar.UnitySupportChat />
      </Topbar>
      <Sidebar currentLocation={location.pathname}>
        <Sidebar.Group>
          <Sidebar.Item as={NavLink} to='/'>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to='/usuarios'>
            Usuários
          </Sidebar.Item>
        </Sidebar.Group>
      </Sidebar>

      <Content>
        <AuthRequired>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthRequired>
      </Content>
    </Layout>
  );
};

export default Index;
