import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import DropdownMenu from 'components/Shared/DropdownMenu';
import OptionItem from 'components/Shared/DropdownMenu/OptionItem';
import { logError } from 'helpers/rxjs-operators/logError';
import ExitToAppIcon from 'mdi-react/ExitToAppIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import React, { memo, useCallback } from 'react';
import { useCallbackObservable, useObservable } from 'react-use-observable';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import authService from 'services/auth';

interface IProps {
  closeDrawer: () => void;
  classes?: any;
}

const useStyle = makeStyles(theme => ({
  root: {
    textAlign: 'left',
    color: theme.palette.primary.contrastText,
    width: '100%'
  },
  text: {
    padding: '8px 15px 0 15px',
    lineHeight: 'normal'
  },
  textSmall: {
    display: 'block',
    marginBottom: '2px'
  }
}));

const UserMenu = memo((props: IProps) => {
  const classes = useStyle(props);

  const [user] = useObservable(() => {
    return authService.getUser().pipe(logError());
  }, []);

  const handleChangePassword = useCallback(() => authService.openChangePassword(), []);

  const [handleLogout] = useCallbackObservable(() => {
    return of(true).pipe(
      tap(() => props.closeDrawer()),
      switchMap(() => authService.logout()),
      logError()
    );
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Grid container className={classes.root} wrap='nowrap'>
      <Grid item xs={true}>
        <Typography variant='body1' color='inherit' className={classes.text}>
          <small className={classes.textSmall}>Bem vindo</small>
          {user.firstName}
        </Typography>
      </Grid>
      <Grid item>
        <DropdownMenu>
          <OptionItem text='Trocar senha' icon={KeyVariantIcon} handler={handleChangePassword} />
          <OptionItem text='Sair' icon={ExitToAppIcon} handler={handleLogout} />
        </DropdownMenu>
      </Grid>
    </Grid>
  );
});

export default UserMenu;
