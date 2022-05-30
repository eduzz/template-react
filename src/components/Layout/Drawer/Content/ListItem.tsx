import { memo, useCallback, useState, SyntheticEvent } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import ExpandMoreIcon from 'mdi-react/ExpandMoreIcon';
import { useContextSelector } from 'use-context-selector';

import styled, { IStyledProp } from '@eduzz/houston-styles';

import { IMenu } from '..';
import { DrawerContext } from '../context';

import PermissionHide from '@/components/Shared/PermissionHide';

interface IProps extends IStyledProp {
  data: IMenu;
  onClick: (menu: IMenu) => void;
}

const DrawerListItem: React.FC<IProps> = ({ data, onClick, className }) => {
  const disableHoverListener = useContextSelector(DrawerContext, context => context.isTemporary || context.isFull);

  const [expanded, setExpanded] = useState(false);

  const handleClick = useCallback(() => onClick(data), [data, onClick]);
  const handleSubClick = useCallback((menu: IMenu) => onClick(menu), [onClick]);
  const handleExandedClick = useCallback((event: SyntheticEvent, expanded: boolean) => setExpanded(expanded), []);

  if (!data.submenu || !data.submenu.length) {
    return (
      <PermissionHide>
        <ListItem button disableGutters className={`${className} item`} onClick={handleClick}>
          {!!data.icon && (
            <Tooltip title={data.display} placement='right' arrow disableHoverListener={disableHoverListener}>
              <ListItemIcon className='icon' classes={{ root: 'text' }}>
                <data.icon />
              </ListItemIcon>
            </Tooltip>
          )}
          <ListItemText primary={data.display} classes={{ primary: 'text' }} />
        </ListItem>
      </PermissionHide>
    );
  }

  return (
    <PermissionHide>
      <Accordion
        expanded={expanded}
        onChange={handleExandedClick}
        className={`${className} expandablePanel ${expanded ? 'active' : ''}`}
      >
        <AccordionSummary className='expandableTitle' expandIcon={<ExpandMoreIcon className='icon' />}>
          {!!data.icon && (
            <ListItemIcon className='icon' classes={{ root: 'text' }}>
              <data.icon />
            </ListItemIcon>
          )}
          <ListItemText primary={data.display} classes={{ primary: 'text' }} />
        </AccordionSummary>
        <AccordionDetails className='expandableDetails'>
          <List className='innerList'>
            {data.submenu.map(sub => (
              <DrawerListItem key={sub.path} data={sub} onClick={handleSubClick} />
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </PermissionHide>
  );
};

export default styled(memo(DrawerListItem))`
  &.item {
    padding-left: 14px;
    opacity: 0.8;
    &.active {
      opacity: 1;
      background: ${({ theme }) => theme.brandColor.primary.dark};
    }
  }

  & .icon {
    margin: 0;
    min-width: 34px;
    margin-right: 15px;
    fill: white;
  }

  & .text {
    color: inherit;
  }

  &.expandablePanel {
    background: ${({ theme }) => theme.brandColor.primary.pure};
    color: white;
    margin-left: -10px;
    box-shadow: none;
    margin: 0;
    &.active {
      background: ${({ theme }) => theme.brandColor.primary.dark};
    }
  }

  & .expandableTitle:hover {
    background: ${({ theme }) => theme.brandColor.primary.dark};
  }

  & .expandableDetails {
    padding: 0;
  }

  & .innerList {
    padding: 0;
    width: 100%;
    & > div {
      padding-left: 40px;
    }
  }
`;
