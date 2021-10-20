import { memo, SyntheticEvent, useCallback, useContext } from 'react';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import DotsHorizontalIcon from 'mdi-react/DotsHorizontalIcon';

import createUseStyles from '@eduzz/houston-ui/styles/createUseStyles';

import DropdownMenuContext from './context';

interface IProps {
  text: string;
  icon?: typeof DotsHorizontalIcon;
  handler: () => void;
}

const useStyle = createUseStyles({
  text: {
    paddingLeft: '0 !important'
  }
});

const OptionItem = memo((props: IProps) => {
  const context = useContext(DropdownMenuContext);
  const classes = useStyle(props);

  const onClick = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      event.stopPropagation();
      context(props.handler);
    },
    [context, props.handler]
  );

  return (
    <MenuItem onClick={onClick}>
      {!!props.icon && (
        <ListItemIcon>
          <props.icon />
        </ListItemIcon>
      )}
      <ListItemText inset={!!props.icon} primary={props.text} className={props.icon ? classes.text : null} />
    </MenuItem>
  );
});

export default OptionItem;
