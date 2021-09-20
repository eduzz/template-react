import { memo, useCallback, useState, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Button from '@eduzz/houston-ui/Button';

export interface IAlertShowParams {
  message: React.ReactNode;
  title?: string;
  confirmation?: boolean;
}

interface IAlertShowParamsState extends IAlertShowParams {
  onConfirm: () => void;
  onCancel: () => void;
}

type AlertComponent = ReturnType<typeof memo> & {
  show?(params: string): Promise<boolean>;
  show?(params: IAlertShowParams): Promise<boolean>;

  confirm?(params: string): Promise<boolean>;
  confirm?(params: IAlertShowParams): Promise<boolean>;
};

let lastPromise = Promise.resolve(false);
let componentCallback: (params: IAlertShowParams) => Promise<boolean>;

const useStyle = makeStyles({
  root: { zIndex: 1600 },
  content: { minWidth: '250px' }
});

const Alert: AlertComponent = memo(() => {
  const classes = useStyle();
  const [opened, setOpened] = useState<boolean>(false);
  const [params, setParams] = useState<IAlertShowParamsState>();

  const onReceiveParams = useCallback((params: IAlertShowParams): Promise<boolean> => {
    const result = new Promise<boolean>(resolve => {
      setOpened(true);
      setParams({
        confirmation: false,
        title: null,
        ...params,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      });
    });

    result.then(() => setOpened(false));
    return result;
  }, []);

  useEffect(() => {
    componentCallback = onReceiveParams;
    return () => (componentCallback = null);
  }, [onReceiveParams]);

  return (
    <Dialog open={opened} keepMounted onClose={params?.onCancel} className={classes.root}>
      <DialogTitle>{params?.title ?? (params?.confirmation ? 'Confirmação' : 'Atenção')}</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.content}>{params?.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {params?.confirmation && (
          <Button onClick={params?.onCancel} variant='text'>
            Cancelar
          </Button>
        )}
        <Button onClick={params?.onConfirm}>OK</Button>
      </DialogActions>
    </Dialog>
  );
});

function callComponent(params: IAlertShowParams): Promise<boolean> {
  if (!componentCallback) throw new Error('Please, initialize an Alert before');

  //prevent an alert to overhide another
  return (lastPromise = lastPromise.then(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 300));
    return componentCallback(params);
  }));
}

Alert.show = (params: string | IAlertShowParams) => {
  return callComponent(typeof params === 'string' ? { message: params } : params);
};

Alert.confirm = (params: string | IAlertShowParams) => {
  return callComponent({ ...(typeof params === 'string' ? { message: params } : params), confirmation: true });
};

export default Alert;
