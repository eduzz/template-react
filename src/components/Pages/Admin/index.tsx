import { useCallback, useRef, useState } from 'react';

import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon';
import ViewDashboardIcon from 'mdi-react/ViewDashboardIcon';
import { NavLink, Outlet } from 'react-router-dom';

import EduzzAppsToolbar from '@eduzz/apps-toolbar-react';
import AvatarOutline from '@eduzz/houston-icons/AvatarOutline';
import DashboardRoundOutline from '@eduzz/houston-icons/DashboardRoundOutline';
import styled, { breakpoints, IStyledProp } from '@eduzz/houston-styles';
import Layout from '@eduzz/houston-ui/Layout';
import { TOOLBAR_HEIGHT } from '@eduzz/houston-ui/Layout/Sidebar/context';

import { ScrollTopContext } from './scrollTopContext';

import { IMenu } from '@/components/Layout/Drawer';

interface IProps extends IStyledProp {}

const AdminLayout: React.FC<IProps> = ({ className }) => {
  const mainContent = useRef<HTMLDivElement>();
  const [menu] = useState<IMenu[]>(() => [
    { path: '/', display: 'Dashboard', icon: ViewDashboardIcon },
    { path: '/usuarios', display: 'Usuários', icon: AccountMultipleIcon }
  ]);

  const [, setVisible] = useState(false);

  const toggleMenu = useCallback(() => setVisible(v => !v), []);
  const scrollTop = useCallback(() => setTimeout(() => mainContent.current.scrollTo(0, 0), 100), []);

  console.log({ menu });

  return (
    <div className={className}>
      <EduzzAppsToolbar application='orbita' disableChat user={null}>
        <EduzzAppsToolbar.IconMenu onClick={toggleMenu} />
        <EduzzAppsToolbar.Apps />
        <EduzzAppsToolbar.User />
      </EduzzAppsToolbar>

      <ScrollTopContext.Provider value={scrollTop}>
        <Layout>
          <Layout.Sidebar>
            <Layout.Sidebar.Menu>
              <Layout.Sidebar.MenuItem as={NavLink} to='/' icon={<DashboardRoundOutline />}>
                Dashboard
              </Layout.Sidebar.MenuItem>
              <Layout.Sidebar.MenuItem as={NavLink} to='/usuarios' icon={<AvatarOutline />}>
                Usuários
              </Layout.Sidebar.MenuItem>
            </Layout.Sidebar.Menu>
          </Layout.Sidebar>

          <Layout.Content>
            <main ref={mainContent} className='__main-content'>
              <Outlet />
            </main>
          </Layout.Content>
        </Layout>
      </ScrollTopContext.Provider>
    </div>
  );
};

export default styled(AdminLayout)`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;

  & .__main-content {
    margin-top: ${TOOLBAR_HEIGHT}px;
    padding: ${({ theme }) => theme.variables.contentPadding}px;

    ${breakpoints.up('sm')} {
      padding: ${({ theme }) => theme.variables.contentPaddingUpSm}px;
    }
  }
`;
