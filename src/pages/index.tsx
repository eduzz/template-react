import { NavLink, Route, Routes, useLocation } from 'react-router-dom';

import AvatarOutline from '@eduzz/houston-icons/AvatarOutline';
import DashboardRoundOutline from '@eduzz/houston-icons/DashboardRoundOutline';
import Layout from '@eduzz/houston-ui/Layout';

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
          <Sidebar.Item as={NavLink} to='/' icon={<DashboardRoundOutline />}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to='/usuarios' icon={<AvatarOutline />}>
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
