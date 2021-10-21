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

import createUseStyles from '@eduzz/houston-ui/styles/createUseStyles';

import { IMenu } from '..';
import { DrawerContext } from '../context';

import PermissionHide from '@/components/Shared/PermissionHide';

interface IProps {
  data: IMenu;
  onClick: (menu: IMenu) => void;
}

const useStyle = createUseStyles(theme => ({
  item: {
    paddingLeft: 14,
    opacity: 0.8,
    '&.active': {
      opacity: 1
      // background: darken(theme.colors.primary.main, 0.3)
    }
  },
  icon: {
    margin: '0',
    minWidth: 34,
    marginRight: 15,
    fill: theme.colors.primary.contrastText
  },
  text: {
    color: 'inherit'
  },
  expandablePanel: {
    background: theme.colors.primary.main,
    color: theme.colors.primary.contrastText,
    marginLeft: -10,
    boxShadow: 'none',
    margin: 0,
    '&.active': {
      // background: darken(theme.colors.primary.main, 0.1)
    }
  },
  expandableTitle: {
    '&:hover': {
      // background: darken(theme.colors.primary.main, 0.1)
    }
  },
  expandableDetails: {
    padding: 0
  },
  innerList: {
    padding: 0,
    width: '100%',
    '& > div': {
      paddingLeft: 40
    }
  }
}));

const DrawerListItem = memo((props: IProps) => {
  const classes = useStyle(props);
  const disableHoverListener = useContextSelector(DrawerContext, context => context.isTemporary || context.isFull);

  const [expanded, setExpanded] = useState(false);

  const handleClick = useCallback(() => props.onClick(props.data), [props]);
  const handleSubClick = useCallback((menu: IMenu) => props.onClick(menu), [props]);
  const handleExandedClick = useCallback((event: SyntheticEvent, expanded: boolean) => setExpanded(expanded), []);

  if (!props.data.submenu || !props.data.submenu.length) {
    return (
      <PermissionHide>
        <ListItem button disableGutters className={classes.item} onClick={handleClick}>
          {!!props.data.icon && (
            <Tooltip title={props.data.display} placement='right' arrow disableHoverListener={disableHoverListener}>
              <ListItemIcon className={classes.icon} classes={{ root: classes.text }}>
                <props.data.icon />
              </ListItemIcon>
            </Tooltip>
          )}
          <ListItemText primary={props.data.display} classes={{ primary: classes.text }} />
        </ListItem>
      </PermissionHide>
    );
  }

  return (
    <PermissionHide>
      <Accordion
        expanded={expanded}
        onChange={handleExandedClick}
        className={`${classes.expandablePanel} ${expanded ? 'active' : ''}`}
      >
        <AccordionSummary className={classes.expandableTitle} expandIcon={<ExpandMoreIcon className={classes.icon} />}>
          {!!props.data.icon && (
            <ListItemIcon className={classes.icon} classes={{ root: classes.text }}>
              <props.data.icon />
            </ListItemIcon>
          )}
          <ListItemText primary={props.data.display} classes={{ primary: classes.text }} />
        </AccordionSummary>
        <AccordionDetails className={classes.expandableDetails}>
          <List className={classes.innerList}>
            {props.data.submenu.map(sub => (
              <DrawerListItem key={sub.path} data={sub} onClick={handleSubClick} />
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </PermissionHide>
  );
});

export default DrawerListItem;
