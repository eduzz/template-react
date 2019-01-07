import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toolbar from 'components/Layout/Toolbar';
import AddressForm from 'components/Shared/AddressForm';
import ErrorMessage from 'components/Shared/ErrorMessage';
import ImageSelector, { IImageSelectorResult } from 'components/Shared/ImageSelector';
import Toast from 'components/Shared/Toast';
import { WithStyles } from 'decorators/withStyles';
import imageUrl from 'helpers/imageUrl';
import textCounter from 'helpers/textCounter';
import ICompany from 'interfaces/models/company';
import FolderOpenIcon from 'mdi-react/FolderOpenIcon';
import React, { Fragment } from 'react';
import RxOp from 'rxjs-operators';
import companyService from 'services/company';

interface IState extends IStateForm<ICompany> {
  openedImageSelector: boolean;
  loading: boolean;
  error: any;
}

@WithStyles({
  logo: {
    position: 'relative',
    textAlign: 'center',
    minWidth: 180,
    cursor: 'pointer',
    '&:hover > $logoHover': {
      opacity: 1
    },
    '& img': {
      maxWidth: 180
    }
  },
  logoHover: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    background: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    lineHeight: '180px',
    transition: '0.3s',
    pointerEvents: 'none',
    opacity: 0,
    '& svg': {
      verticalAlign: 'middle',
    }
  },
  actions: {
    textAlign: 'right',
    marginTop: 20
  }
})
export default class CompanyIndexPage extends FormComponent<{ classes?: any; }, IState>{

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true, error: null });

    companyService.get().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(company => {
      this.setState({ model: company, loading: false });
    }, error => this.setState({ loading: false, error }));
  }

  handleSubmit = (isValid: boolean) => {
    if (!isValid) return;

    this.setState({ loading: true });

    companyService.save(this.state.model as ICompany).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(() => {
      this.setState({ loading: false });
      Toast.show('Salvo com sucesso');
    }, err => {
      this.setState({ loading: false });
      Toast.error(err);
    });
  }

  openImageSelector = () => {
    this.setState({ openedImageSelector: true });
  }

  handleCompleteImageSelector = (image: IImageSelectorResult) => {
    this.setState({ openedImageSelector: false });
    if (!image) return;

    this.updateModel((model, v) => model.logo = v)(image);
  }

  render() {
    const { model, loading, error, openedImageSelector } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar title='Informações da Empresa' />

        <FormValidation onSubmit={this.handleSubmit}>
          <Card>
            {loading &&
              <LinearProgress variant='indeterminate' color='secondary' />
            }

            {!loading && !!error &&
              <CardContent>
                <ErrorMessage error={error} tryAgain={this.loadData} />
              </CardContent>
            }

            {!error &&
              <Fragment>
                <CardContent>
                  <Grid container spacing={16} wrap='wrap-reverse' alignItems='center'>
                    <Grid item xs={12} sm={true}>
                      <FieldText
                        label='Nome'
                        validation='required|max:150'
                        helperText={textCounter(model.name, 150)}
                        value={model.name}
                        disabled={loading}
                        onChange={this.updateModel((m, v) => m.name = v)}
                      />

                      <FieldText
                        label='E-mail'
                        validation='required|email|max:150'
                        helperText={textCounter(model.email, 150)}
                        value={model.email}
                        disabled={loading}
                        onChange={this.updateModel((m, v) => m.email = v)}
                      />
                    </Grid>

                    <Grid item xs={12} sm='auto' className={classes.logo}>
                      <div className={classes.logoHover}>
                        <FolderOpenIcon size={50} />
                      </div>
                      <img src={imageUrl(model.logo)} onClick={this.openImageSelector} />

                      <ImageSelector
                        opened={openedImageSelector}
                        width={300}
                        height={300}
                        onComplete={this.handleCompleteImageSelector}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={16}>
                    <Grid item xs={12} sm={7}>
                      <FieldText
                        label='Website'
                        validation='required|url|max:250'
                        helperText={textCounter(model.website, 250)}
                        value={model.website}
                        disabled={loading}
                        onChange={this.updateModel((m, v) => m.website = v)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                      <FieldText
                        label='Phone'
                        validation='required|max:11'
                        mask='phone'
                        value={model.phone}
                        disabled={loading}
                        onChange={this.updateModel((m, v) => m.phone = v)}
                      />
                    </Grid>
                  </Grid>

                </CardContent>

                <Divider />

                <CardContent>
                  <Typography variant='subtitle1'>Endereço</Typography>

                  <AddressForm
                    value={model.address}
                    disabled={loading}
                    onChange={this.updateModel((m, v) => m.address = v)}
                  />
                </CardContent>
              </Fragment>
            }
          </Card>

          <div className={classes.actions}>
            <Button
              type='submit'
              disabled={loading}
              variant='contained'
              color='secondary'
            >
              Salvar
            </Button>
          </div>
        </FormValidation>
      </Fragment >
    );
  }
}