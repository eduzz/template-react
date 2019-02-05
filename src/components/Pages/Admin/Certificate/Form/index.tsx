import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldSwitch from '@react-form-fields/material-ui/components/Switch';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { theme } from 'assets/theme';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toolbar from 'components/Layout/Toolbar';
import ErrorMessage from 'components/Shared/ErrorMessage';
import Toast from 'components/Shared/Toast';
import { IRouteProps } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import getCertificatePreviewUrl from 'helpers/certificateUrl';
import ContentSaveIcon from 'mdi-react/ContentSaveIcon';
import OpenInNewIcon from 'mdi-react/OpenInNewIcon';
import React, { Fragment } from 'react';
import RxOp from 'rxjs-operators';
import certificateService from 'services/certificate';

import Editor from './Editor';
import { IEditorItem } from './Editor/interfaces';
import CertificatePreviewDialog from './PreviewDialog';

interface IState extends IStateForm<{
  id: number;
  title: string;
  image: string;
  html: string;
  config: { image: string; items: IEditorItem[] };
  default: boolean;
}> {
  isEdit: boolean;
  loading: boolean;
  previewOpened: boolean;
  error?: any;
}

interface IProps extends IRouteProps {
  classes?: any;
}

@WithStyles({
  loader: {
    textAlign: 'center'
  },
  link: {
    textAlign: 'right',
    marginTop: 30
  },
  toolbarBtn: {
    '& > span > svg': {
      [theme.breakpoints.only('xs')]: {
        marginRight: '0 !important',
      },
    }
  }
})
export default class CertificateFormPage extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...this.state,
      model: { ...this.state.model, default: false },
      isEdit: !!this.props.match.params.id, loading: true,
      previewOpened: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const id = Number(this.props.match.params.id);

    if (!id) {
      this.setState({ loading: false });
      return;
    }

    this.setState({ loading: true, error: null });

    certificateService.get(id).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(certificate => {
      this.setState({
        loading: false,
        model: {
          ...certificate,
          config: JSON.parse(certificate.config)
        }
      });
    }, error => this.setState({ error, loading: false }));
  }

  handleSubmit = async (isValid: boolean) => {
    if (!isValid) return null;

    const { model } = this.state;
    const params = { ...model, config: JSON.stringify(model.config) };

    return new Promise<number>(resolve => {
      certificateService.save(params).pipe(
        RxOp.loader(),
        RxOp.logError(),
        RxOp.bindComponent(this),
      ).subscribe(certificateId => {
        Toast.show('Certificado salvo com sucesso');
        resolve(certificateId);

        if (certificateId === model.id) return;
        this.props.history.replace(`/certificados/${certificateId}/editar`);
        this.setState({ model: { ...model, id: certificateId }, isEdit: true });
      }, err => {
        resolve(null);
        Toast.error(err);
      });
    });
  }

  handleChangeEditor = (value: { image: string; html: string; items: IEditorItem[] }) => {
    const { html, ...config } = value;
    this.setState({ model: { ...this.state.model, config, html } });
  }

  handleOpenPreview = () => {
    this.setState({ previewOpened: true });
  }

  handleClosePreview = async (placeholders?: { [key: string]: string }) => {
    this.setState({ previewOpened: false });
    if (!placeholders) return;

    const certificateId = await this.handleSubmit(this.isFormValid());
    if (!certificateId) return;

    window.open(getCertificatePreviewUrl(certificateId, placeholders));
  }

  render() {
    const { model, loading, error, isEdit, previewOpened } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <CertificatePreviewDialog
          opened={previewOpened}
          onCancel={this.handleClosePreview}
          onComplete={this.handleClosePreview}
        />

        <FormValidation onSubmit={this.handleSubmit} ref={this.bindForm}>
          <Toolbar>
            <Grid container spacing={16} alignItems='center'>
              <Grid item xs={true}>
                <Typography variant='h6' noWrap>
                  {`${isEdit ? 'Editar' : 'Novo'} certificado`}
                </Typography>
              </Grid>

              <Grid item xs={false}>
                <Button className={classes.toolbarBtn} size='small' disabled={loading || error} onClick={this.handleOpenPreview}>
                  <OpenInNewIcon />
                  <Hidden implementation='css' xsDown>Visualizar</Hidden>
                </Button>
              </Grid>

              <Grid item xs={false}>
                <Button className={classes.toolbarBtn} size='small' type='submit' color='secondary' variant='contained' disabled={loading || error}>
                  <ContentSaveIcon />
                  <Hidden implementation='css' xsDown>Salvar</Hidden>
                </Button>
              </Grid>
            </Grid>
          </Toolbar>

          <Card>

            {loading &&
              <CardContent className={classes.loader}>
                <CircularProgress color='secondary' />
              </CardContent>
            }

            {!!error &&
              <CardContent >
                <ErrorMessage error={error} tryAgain={this.loadData} />
              </CardContent>
            }

            {!loading && !error &&
              <CardContent>
                <FieldText
                  label='Título'
                  placeholder='Digite o título do certificado'
                  value={model.title}
                  onChange={this.updateModel((m, v) => m.title = v)}
                  validation='required|max:50'
                />

                <FieldSwitch
                  checked={model.default}
                  label='Certificado Padrão'
                  helperText='Todos os cursos que não possuem certificado usarão esse como padrão'
                  onChange={this.updateModel((m, v) => m.default = v)}
                />

                <Typography className={classes.link}>
                  Para baixar um modelo de certificado <a href='https://cdn.nutror.com/certificado_default_nutror.psd'>clique aqui</a>
                </Typography>

                <Editor value={model.config} onChange={this.handleChangeEditor} />
              </CardContent>
            }
          </Card>

        </FormValidation>
      </Fragment>
    );
  }
}