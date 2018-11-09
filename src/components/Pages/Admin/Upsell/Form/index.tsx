import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { FormValidation } from '@react-form-fields/material-ui/components/FormValidation';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toolbar from 'components/Layout/Toolbar';
import Toast from 'components/Shared/Toast';
import { WithRouter } from 'decorators/withRouter';
import { History } from 'history';
import { IUpsell } from 'interfaces/models/upsell';
import ContentSaveIcon from 'mdi-react/ContentSaveIcon';
import React from 'react';
import rxjsOperators from 'rxjs-operators';
import upsellService from 'services/upsell';

import Actions from './Actions';
import ImageUploader from './ImageUploader';
import Info from './Info';
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
        title: '',
        highlight_image: '',
        small_image: '',
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
              <Button type='submit' color='secondary' variant='contained'>
                <ContentSaveIcon />
                <Hidden implementation='css' xsDown>Salvar</Hidden>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>

        <Card>

          <CardContent>
            <Actions
              model={model}
              onChange={this.updateModel((m, v) => Object.assign(m, v))}
            />
          </CardContent>

          <Divider />

          <CardContent>
            <Type
              model={model}
              onChange={this.updateModel((m, v) => Object.assign(m, v))}
            />
          </CardContent>

          <Divider />

          <CardContent>
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

          <Divider />

          <CardContent>
            <Grid container spacing={16}>
              <Grid item xs={3}>
                <Typography variant='subtitle1'>
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
                <Typography variant='subtitle1'>
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
          </CardContent>

        </Card>

      </FormValidation>
    );
  }
}