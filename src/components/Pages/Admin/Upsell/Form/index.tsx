import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FieldSwitch } from '@react-form-fields/material-ui';
import { FormValidation } from '@react-form-fields/material-ui/components/FormValidation';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toolbar from 'components/Layout/Toolbar';
import Toast from 'components/Shared/Toast';
import { WithRouter } from 'decorators/withRouter';
import { History } from 'history';
import { IUpsell } from 'interfaces/models/upsell';
import React from 'react';
import rxjsOperators from 'rxjs-operators';
import upsellService from 'services/upsell';

import Actions from './Actions';
import ImageUploader from './ImageUploader';
import Info from './Info';
import Save from './Save';
import Type from './Type';
import Config from './UpsellConfig';

interface IProps {
  classes?: any;
  match?: any;
  history?: History;
}

interface IState extends IStateForm<IUpsell> {
  isValid: boolean;
}

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
      }
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
    const { model } = this.state;

    return (
      <FormValidation onSubmit={this.handleSubmit}>
        <Toolbar>
          <Grid container spacing={16} alignItems='center'>
            <Grid item xs={true}>
              <Typography variant='h6' color='inherit' noWrap>
                {`${model.id ? 'Editar' : 'Novo'} Upsell`}
              </Typography>
            </Grid>
            <Grid item xs={false}>
              <FieldSwitch
                label='Publicado'
                checked={model.published}
                onChange={this.updateModel((m, v) => m.published = v)}
                helperText='Status da oferta'
              />
            </Grid>
          </Grid>
        </Toolbar>

        <Card>

          <CardContent>
            <Type
              model={model}
              onChange={this.updateModel((m, v) => Object.assign(m, v))}
            />
          </CardContent>

          <Divider />

          <CardContent>
            <Actions
              model={model}
              onChange={this.updateModel((m, v) => Object.assign(m, v))}
            />
          </CardContent>

          <Divider />

          <CardContent>
            <Typography variant='subtitle1'>Dados da oferta</Typography>

            <Grid container spacing={16}>
              <Grid item xs={3}>
                <Typography variant='caption'>
                  Imagem
                  <small>&nbsp;tamanho: 250x250</small>
                </Typography>

                <ImageUploader
                  width={250}
                  height={250}
                  onChange={this.updateModel((m, v) => m.small_image = v)}
                  value={model.small_image}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant='caption'>
                  Imagem de Destaque
                  <small>&nbsp;tamanho: 1840x460</small>
                </Typography>

                <ImageUploader
                  width={1840}
                  height={460}
                  onChange={this.updateModel((m, v) => m.highlight_image = v)}
                  value={model.highlight_image}
                  disabled={!model.highlight}
                />
              </Grid>
            </Grid>

            <Info
              model={model}
              onChange={this.updateModel((m, v) => Object.assign(m, v))}
            />
          </CardContent>

          <Divider />

          <CardContent>
            <Config
              courses={model.courses || []}
              onChange={this.updateModel((m, v) => m.courses = v)}
            />
          </CardContent>

          <CardContent>
            <Save
              label={model.label_text}
              updateModel={this.updateModel}
            />
          </CardContent>
        </Card>

      </FormValidation>
    );
  }
}