import { useCallback, useRef, useState } from 'react';

import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon';
import ViewDashboardIcon from 'mdi-react/ViewDashboardIcon';
import { Redirect, Route, Switch } from 'react-router-dom';

import styled, { breakpoints, IStyledProp } from '@eduzz/houston-ui/styles/styled';

import DashboardIndexPage from './Dashboard';
import { ScrollTopContext } from './scrollTopContext';
import UserIndexPage from './Users';

import Drawer, { IMenu } from '@/components/Layout/Drawer';

interface IProps extends IStyledProp {}

const AdminPage: React.FC<IProps> = ({ className }) => {
  const mainContent = useRef<HTMLDivElement>();
  const [menu] = useState<IMenu[]>(() => [
    { path: '/', display: 'Dashboard', icon: ViewDashboardIcon },
    { path: '/usuarios', display: 'Usuários', icon: AccountMultipleIcon }
  ]);

  const scrollTop = useCallback(() => setTimeout(() => mainContent.current.scrollTo(0, 0), 100), []);
  const renderRedirect = useCallback(() => <Redirect to='/' />, []);

  return (
    <div className={className}>
      <ScrollTopContext.Provider value={scrollTop}>
        <Drawer menu={menu}>
          <main ref={mainContent} className='main-content'>
            <Switch>
              <Route path='/usuarios' component={UserIndexPage} />
              <Route path='/' component={DashboardIndexPage} />
              <Route render={renderRedirect} />
            </Switch>
          </main>
        </Drawer>
      </ScrollTopContext.Provider>
    </div>
  );
};

export default styled(AdminPage)`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;

  & .main-content {
    background-color: ${({ theme }) => theme.colors.background.default};
    width: 100vw;
    height: 100vh;
    overflow: auto;
    padding: ${({ theme }) => theme.variables.contentPadding}px;

    ${breakpoints.up('sm')} {
      padding: ${({ theme }) => theme.variables.contentPaddingUpSm}px;
    }
  }
`;
