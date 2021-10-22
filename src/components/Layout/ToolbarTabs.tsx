import { memo, ReactNode } from 'react';

import AppBar from '@mui/material/AppBar';
import clsx from 'clsx';
import { useContextSelector } from 'use-context-selector';

import styled, { IStyledProp, breakpoints } from '@eduzz/houston-ui/styles/styled';

import { DrawerContext } from './Drawer/context';

interface IProps extends IStyledProp {
  children: ReactNode;
}

const ToolbarTabs: React.FC<IProps> = ({ children, className }) => {
  const drawerMini = useContextSelector(DrawerContext, context => !context.isTemporary && !context.isFull);

  return (
    <div className={className}>
      <AppBar className={clsx({ appBar: true, appBarDrawerMini: drawerMini })}>{children}</AppBar>
    </div>
  );
};

export default styled(memo(ToolbarTabs))`
  height: ${({ theme }) => theme.variables.headerHeight}px;
  margin-top: ${({ theme }) => theme.variables.contentPadding * -1}px;
  margin-bottom: ${({ theme }) => theme.variables.contentPadding}px;

  ${breakpoints.up('sm')} {
    margin-top: ${({ theme }) => theme.variables.contentPaddingUpSm * -1}px;
    margin-bottom: ${({ theme }) => theme.variables.contentPaddingUpSm}px;
  }

  & .appBar {
    position: fixed;
    top: ${({ theme }) => theme.variables.headerHeightUpSm}px;
    background-color: ${({ theme }) => theme.colors.grey['900']};
    color: white;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.29);
    width: 100%;

    ${breakpoints.up('md')} {
      background-color: white;
      color: ${({ theme }) => theme.colors.text.primary};
      width: ${({ theme }) => `calc(100% - ${theme.variables.drawerWidthFull}px)`};
    }
  }

  & .appBarDrawerMini {
    width: ${({ theme }) => `calc(100% - ${theme.variables.drawerWidthMini}px)`};
  }
`;
