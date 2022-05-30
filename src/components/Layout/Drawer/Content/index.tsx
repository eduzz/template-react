import { memo, useCallback } from 'react';

import List from '@mui/material/List';

import styled, { IStyledProp } from '@eduzz/houston-styles';

import { IMenu } from '..';
import DrawerListItem from './ListItem';

import logoWhite from '@/assets/images/logo-white.png';

interface IProps extends IStyledProp {
  menu: IMenu[];
  navigate: (path: string) => void;
}

const Content: React.FC<IProps> = ({ menu, navigate: navigateProp, className }) => {
  const navigate = useCallback((menu: IMenu) => navigateProp(menu.path), [navigateProp]);

  return (
    <div className={className}>
      <div className='header'>
        <div className='headerLogo'>
          <img src={logoWhite} className='logo' alt='logo' />
        </div>
      </div>

      <List className='list'>
        {menu.map(item => (
          <DrawerListItem key={item.path} data={item} onClick={navigate} />
        ))}
      </List>
    </div>
  );
};

export default styled(memo(Content))`
  background: ${({ theme }) => theme.neutralColor.low.pure};
  color: white;
  height: 100vh;

  & .header {
    padding: 10px 0;
    text-align: center;
  }

  & .headerLogo {
    min-height: ${({ theme }) => theme.variables.headerHeight - 11}px;
  }

  & .logo {
    max-width: calc(100% - 10px);
    width: 150px;
    max-height: 100px;
  }

  & .list {
    padding: 0;
  }

  & .name {
    font-weight: 600px;
    color: white;
    margin-bottom: 15px;
  }
`;
