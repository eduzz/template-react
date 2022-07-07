import { useCallback, useEffect, useRef } from 'react';

import { NavLink, Route, Routes, useLocation } from 'react-router-dom';

import EduzzAppsToolbar from '@eduzz/apps-toolbar-react';
import useBoolean from '@eduzz/houston-hooks/useBoolean';
import AvatarOutline from '@eduzz/houston-icons/AvatarOutline';
import DashboardRoundOutline from '@eduzz/houston-icons/DashboardRoundOutline';
import styled, { breakpoints, IStyledProp } from '@eduzz/houston-styles';
import Layout from '@eduzz/houston-ui/Layout';
import { TOOLBAR_HEIGHT } from '@eduzz/houston-ui/Layout/Sidebar/context';

import DashboardPage from './Dashboard';
import NotFoundPage from './NotFound';
import { ScrollTopContext } from './scrollTopContext';

interface IProps extends IStyledProp {}

const AdminLayout: React.FC<IProps> = ({ className }) => {
  const mainContent = useRef<HTMLDivElement>(null);

  const [menuVisible, toggleMenu, , closeMenu] = useBoolean(false);
  const location = useLocation();

  const scrollTop = useCallback(() => setTimeout(() => mainContent.current?.scrollTo(0, 0), 100), []);

  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className={className}>
      <EduzzAppsToolbar application='orbita' disableChat user={undefined}>
        <EduzzAppsToolbar.IconMenu onClick={toggleMenu} />
        <EduzzAppsToolbar.Apps />
        <EduzzAppsToolbar.User />
      </EduzzAppsToolbar>

      <ScrollTopContext.Provider value={scrollTop}>
        <Layout>
          <Layout.Sidebar mobileVisible={menuVisible}>
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
              <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
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
    padding: ${({ theme }) => theme.variables?.contentPadding}px;

    ${breakpoints.up('sm')} {
      padding: ${({ theme }) => theme.variables?.contentPaddingUpSm}px;
    }
  }
`;
