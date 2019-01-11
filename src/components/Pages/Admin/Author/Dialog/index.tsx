import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldHidden from '@react-form-fields/material-ui/components/Hidden';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import ImageSelector from 'components/Shared/ImageSelector';
import Toast from 'components/Shared/Toast';
import { WithStyles } from 'decorators/withStyles';
import { IAuthor } from 'interfaces/models/author';
import CameraIcon from 'mdi-react/CameraIcon';
import * as React from 'react';
import RxOp from 'rxjs-operators';
import authorService from 'services/author';
import { CDN_URL } from 'settings';

interface IState extends IStateForm<IAuthor> {
  isSaving: boolean;
  openedAvatar: boolean;
}

interface IProps {
  classes?: any;
  opened: boolean;
  author?: IAuthor;
  onComplete: (author: IAuthor) => void;
  onCancel: () => void;
}

@WithStyles(theme => ({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  },
  avatarContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
  avatar: {
    width: 60,
    height: 60,
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      boxShadow: theme.shadows[4]
    },
    [theme.breakpoints.down('xs')]: {
      width: 150,
      height: 150,
    },
  }
}))
export default class AuthorFormDialog extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, isSaving: false, openedAvatar: false };
  }

  get isEdit(): boolean {
    return !!this.state.model.id;
  }

  handleEnter = () => {
    const { author } = this.props;

    this.setState({ model: { ...(author || {}) } });
  }

  handleExit = () => {
    this.resetForm();
  }

  handleOpenAvatar = () => {
    this.setState({ openedAvatar: true });
  }

  handleUpdateAvatar = (avatar: string) => {
    this.setState({ openedAvatar: false });

    if (!avatar) return;
    this.setState({ model: { ...this.state.model, avatar } });
  }

  onCancel = () => {
    this.props.onCancel();
  }

  onSubmit = async (isValid: boolean) => {
    if (!isValid) return;

    this.setState({ isSaving: true });

    authorService.save(this.state.model).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(author => {
      this.setState({ isSaving: false });

      Toast.show('Salvo com sucesso');
      this.props.onComplete(author);
    }, err => {
      Toast.error(err);
      this.setState({ isSaving: false });
    });
  }

  render() {
    const { isSaving, model, openedAvatar } = this.state;
    const { classes, opened } = this.props;

    return (
      <Dialog
        open={opened || false}
        disableBackdropClick
        disableEscapeKeyDown
        onEnter={this.handleEnter}
        onExited={this.handleExit}
        TransitionComponent={Transition}
      >
        {isSaving && <LinearProgress color='secondary' />}

        <ImageSelector
          opened={openedAvatar}
          width={200}
          height={200}
          onComplete={this.handleUpdateAvatar}
        />

        <FormValidation onSubmit={this.onSubmit} ref={this.bindForm}>
          <DialogTitle>{this.isEdit ? 'Editar' : 'Novo'} Autor</DialogTitle>

          <DialogContent className={classes.content}>
            <Grid container spacing={16} alignItems='center' className={classes.avatarContainer}>
              <Grid item xs={false}>
                {model.avatar ?
                  <Avatar onClick={this.handleOpenAvatar} className={classes.avatar} src={CDN_URL + model.avatar} /> :
                  <Avatar onClick={this.handleOpenAvatar} className={classes.avatar}><CameraIcon /></Avatar>
                }
              </Grid>
              <Grid item xs={true}>
                <Typography>
                  Imagem de perfil<br />
                  <small>200x200</small>
                </Typography>

                <FieldHidden value={model.avatar} validation='required' />
              </Grid>
            </Grid>

            <FieldText
              type='text'
              label='Nome'
              tabIndex={1}
              validation='required|max:120'
              disabled={isSaving}
              value={model.name}
              onChange={this.updateModel((m, v) => m.name = v)}
            />

            <FieldText
              multiline
              rows={100}
              className='textarea'
              type='text'
              label='Resumo'
              tabIndex={2}
              validation='required|max:300'
              helperText={`${(model.description || '').length}/300 caracteres`}
              disabled={isSaving}
              value={model.description}
              onChange={this.updateModel((m, v) => m.description = v)}
            />
          </DialogContent>

          <DialogActions>
            <Button disabled={isSaving} onClick={this.onCancel}>Cancelar</Button>
            <Button color='secondary' type='submit' disabled={isSaving}>Salvar</Button>
          </DialogActions>

        </FormValidation>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}