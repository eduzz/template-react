import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

import { IUpsellFormContext, UpsellFormContext } from '../../Context';
import ActionButtons from '../ActionButtons';

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  labelTextSelect: {
    maxWidth: 266,
  },
}))
export default class Informations extends PureComponent<IProps> {
  static contextType = UpsellFormContext;
  public context: IUpsellFormContext;

  private labelOptions: any = [
    {
      label: 'Adquira já',
      value: 'Adquira já',
    },
    {
      label: 'Comprar',
      value: 'Comprar',
    },
    {
      label: 'Compre agora',
      value: 'Compre agora',
    },
    {
      label: 'Faça aqui sua matricula',
      value: 'Faça aqui sua matricula',
    },
    {
      label: 'Inscreva-se',
      value: 'Inscreva-se',
    },
    {
      label: 'Matricule-se',
      value: 'Matricule-se',
    },
    {
      label: 'Matricule-se Já',
      value: 'Matricule-se Já',
    },
    {
      label: 'Saiba mais',
      value: 'Saiba mais',
    },
    {
      label: 'Sim, eu quero',
      value: 'Sim, eu quero',
    },
  ];

  handleUploadedHighlight = (image: any) => {
    this.context.updateModel(model => model.highlight_images = { ...model.highlight_images, ...image })();
  }

  handleRemovedHighlight = (label: string) => {
    this.context.updateModel(model => model.highlight_images[label] = null)();
  }

  handleUploadedSmallImage = (image: any) => {
    this.context.updateModel(model => model.small_image = image.large)();
  }

  handleRemovedSmallImage = () => {
    this.context.updateModel(model => model.small_image = null)();
  }

  render() {
    const { classes } = this.props;
    const { model, updateModel } = this.context;

    return (
      <Card>
        <CardContent>
          <Grid container direction='column' spacing={16}>
            <Grid item>
              <Typography id='txtInformacoesOferta' variant='subtitle1'>
                <strong>Informações da Oferta</strong>
              </Typography>
              <Typography variant='caption'>
                Insira as informações para definir como será sua oferta, é muito importante que seja um texto coeso e de fácil entendimento.
            </Typography>
            </Grid>
            <Grid item>
              <FieldText
                id='Titulo'
                label='Título'
                value={model.title}
                validation='required|max:50'
                helperText={`${model.title.length}/50 caracteres`}
                onChange={updateModel((model, v) => model.title = v)}
              />
              <FieldText
                id='Descrição'
                label='Descrição'
                value={model.description}
                validation='required|max:300'
                helperText={`${model.description.length}/300 caracteres`}
                onChange={updateModel((model, v) => model.description = v)}
                multiline
              />
              <FieldSelect
                className={classes.labelTextSelect}
                value={model.label_text}
                validation='required'
                onChange={updateModel((model, v) => model.label_text = v)}
                options={this.labelOptions}
                label='Texto do botão de ação'
              />
            </Grid>
            <Grid item>
              <ActionButtons />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}