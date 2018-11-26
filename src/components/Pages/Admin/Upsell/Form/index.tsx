import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toolbar from 'components/Layout/Toolbar';
import Toast from 'components/Shared/Toast';
import { WithRouter } from 'decorators/withRouter';
import { History } from 'history';
import { IUpsell } from 'interfaces/models/upsell';
import React from 'react';
import rxjsOperators from 'rxjs-operators';
import upsellService from 'services/upsell';
import Content from './Content';
import { WithStyles } from 'decorators/withStyles';
import FileDocumentIcon from 'mdi-react/FileDocumentIcon';
import CardContent from '@material-ui/core/CardContent';
import ProductType from './ProductType';

import { UpsellFormContext } from './Context';

interface IProps {
  classes?: any;
  match?: any;
  history?: History;
}

interface IState extends IStateForm<IUpsell> {
  updateModel: (handler: (model: Partial<IUpsell>, value: any) => void) => any;
}

@WithStyles(theme => ({
  root: {
    height: 'calc(100vh - 48px)',
  },
  icon: {
    fill: theme.palette.text.primary,
  },
}))
@WithRouter()
export default class Form extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...this.state,
      model: {
        type: null,
        content: '',
        description: '',
        label_text: 'Saiba mais',
        title: '',
        highlight_image: '',
        small_image: '',
        external_url: '',
        highlight: false,
        offer_shelf: false,
        published: false,
        courses: []
      },
      updateModel: this.updateModel,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (!id) return;

    upsellService.getUpsell(id).pipe(
      rxjsOperators.loader(),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(model => {
      this.setState({ model: { ...this.state.model, ...model, content: model.content.toString() } });
    }, error => Toast.error(error));
  }

  handleSubmit = (isValid: boolean) => {
    console.log(this.state.model);

    if (!isValid) return;

    upsellService.save(this.state.model as IUpsell).pipe(
      rxjsOperators.loader(),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(() => {
      Toast.show('Upsell salvo com sucesso!');
      this.props.history.push('/upsell');
    }, (error: any) => {
      Toast.error(error);
    });
  }

  getFormStatus = () => {
    return this.isFormValid();
  }

  render() {
    const { classes } = this.props;

    console.log(this.state.model);

    return (
      <FormValidation onSubmit={this.handleSubmit}>
        <UpsellFormContext.Provider value={this.state}>
          <div className={classes.root}>
            <Toolbar>
              <Grid container spacing={8} alignItems='center'>
                <Grid item>
                  <FileDocumentIcon className={classes.icon} />
                </Grid>
                <Grid item>
                  <Typography variant='h6'>Ofertas</Typography>
                </Grid>
              </Grid>
            </Toolbar>

            <Card>
              <Content>
                <span />
              </Content>
              <CardContent>
                <ProductType />
              </CardContent>
            </Card>
          </div>
        </UpsellFormContext.Provider>
      </FormValidation>
    );
  }
}