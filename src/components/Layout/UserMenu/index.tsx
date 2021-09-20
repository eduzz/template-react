import { memo, useCallback, useContext, useMemo } from 'react';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ThemeContext from 'assets/theme/context';
import DropdownMenu from 'components/Shared/DropdownMenu';
import OptionItem from 'components/Shared/DropdownMenu/OptionItem';
import DarkIcon from 'mdi-react/Brightness4Icon';
import LightIcon from 'mdi-react/Brightness5Icon';
import ExitToAppIcon from 'mdi-react/ExitToAppIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import { useSelector } from 'react-redux';
import authService from 'services/auth';
import { selectorUser } from 'store/selectors';

import useBoolean from '@eduzz/houston-hooks/useBoolean';

import ChangePasswordDialog from './ChangePassword';

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: -10,
    padding: 0
  },
  avatar: {
    width: 40,
    height: 40,
    fontSize: 16,
    backgroundColor: theme.palette.secondary.main
  }
}));

const UserMenu = memo((props: Record<string, never>) => {
  const classes = useStyles(props);
  const themeContext = useContext(ThemeContext);
  const [changePassword, , showChangePassword, hideChangePassword] = useBoolean(false);

  const user = useSelector(selectorUser);
  const avatarLetters = useMemo(
    () => `${user?.firstName?.substr(0, 1) ?? ''}${user?.lastName?.substr(0, 1) ?? ''}`.trim() || 'U',
    [user]
  );

  const handleLogout = useCallback(() => authService.logout(), []);

  if (!user) {
    return null;
  }

  return (
    <>
      <ChangePasswordDialog opened={changePassword} onComplete={hideChangePassword} />

      <DropdownMenu anchorOrigin={{ vertical: 35, horizontal: 'right' }}>
        <IconButton color='inherit' className={classes.button}>
          <Avatar className={classes.avatar}>{avatarLetters}</Avatar>
        </IconButton>
        <OptionItem
          text={themeContext.currentTheme === 'light' ? 'Tema Escuro' : 'Tema Claro'}
          icon={themeContext.currentTheme === 'light' ? DarkIcon : LightIcon}
          handler={themeContext.toogleTheme}
        />
        <OptionItem text='Trocar senha' icon={KeyVariantIcon} handler={showChangePassword} />
        <OptionItem text='Sair' icon={ExitToAppIcon} handler={handleLogout} />
      </DropdownMenu>
    </>
  );
});

export default UserMenu;
