import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toolbar from 'components/Layout/Toolbar';
import ErrorMessage from 'components/Shared/ErrorMessage';
import Loading from 'components/Shared/Loading';
import Toast from 'components/Shared/Toast';
import { IStyledProps, WithStyles } from 'decorators/withStyles';
import { ICustomization } from 'interfaces/models/customization';
import React, { Fragment } from 'react';
import RxOp from 'rxjs-operators';
import customizationService from 'services/customization';

interface IState extends IStateForm<ICustomization> {
  loading: boolean;
  error?: any;
}

interface IProps extends IStyledProps { }

@WithStyles({
  actions: {
    textAlign: 'right',
    paddingTop: 20
  }
})
export default class CustomizationPage extends FormComponent<IProps, IState> {
  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ error: null, loading: true });

    customizationService.get().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(model => {
      this.setState({ model: model || {}, loading: false });
    }, error => this.setState({ error, loading: false }));
  }

  handleSubmit = (isValid: boolean) => {
    if (!isValid) return;

    customizationService.save(this.state.model).pipe(
      RxOp.loader(),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(model => {
      Toast.show('Configurações salvas');
    }, error => Toast.error(error));
  }

  render() {
    const { model, loading, error } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar title='Customização' />

        {loading &&
          <Card>
            <CardContent>
              <Loading />
            </CardContent>
          </Card>
        }

        {!loading && !!error &&
          <Card>
            <CardContent>
              <ErrorMessage error={error} tryAgain={this.loadData} />
            </CardContent>
          </Card>
        }

        {!loading && !error &&
          <FormValidation onSubmit={this.handleSubmit}>
            <Card>
              <CardContent>
                <FieldText
                  label='Endereço da página de suporte'
                  value={model.support_external_url}
                  onChange={this.updateModel((m, v) => m.support_external_url = v)}
                  validation='string|url'
                />
              </CardContent>
            </Card>

            <div className={classes.actions}>
              <Button variant='contained' color='secondary' type='submit'>
                Salvar
            </Button>
            </div>
          </FormValidation>
        }
      </Fragment>
    );
  }
}