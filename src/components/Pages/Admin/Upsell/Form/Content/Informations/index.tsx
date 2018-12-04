import React, { PureComponent, Fragment } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { UpsellFormContext, IUpsellFormContext } from '../../Context';
import Grid from '@material-ui/core/Grid';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import { WithStyles } from 'decorators/withStyles';
import ImageUploader from './ImageUploader';
import Divider from '@material-ui/core/Divider';

const destaqueVitrine = require('assets/images/destaque-vitrine.png');
const cardVitrine = require('assets/images/card-vitrine.png');
const curso = require('assets/images/curso.png');
const aula = require('assets/images/aula.png');

interface IProps {
  classes?: any;
}

@WithStyles({
  labelTextSelect: {
    maxWidth: 266,
  },
})
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

  render() {
    const { classes } = this.props;
    const { model, updateModel } = this.context;

    return (
      <Fragment>
        <CardContent>
          <Grid container direction='column' spacing={16}>
            <Grid item>
              <Typography variant='subtitle1'>
                <strong>Informações da Oferta</strong>
              </Typography>
              <Typography variant='caption'>Insira as informações para definir como será sua oferta, é muito importante que seja um texto coeso e de fácil entendimento.</Typography>
            </Grid>
            <Grid item>
              <FieldText
                label='Título'
                value={model.title}
                validation='required|max:50'
                helperText={`${model.title.length}/50 caracteres`}
                onChange={updateModel((model, v) => model.title = v)}
              />
              <FieldText
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
              <Grid container direction='column' spacing={32}>
                <Grid item>
                  <Typography variant='subtitle1' gutterBottom>Mídias</Typography>
                  <ImageUploader
                    resolution={{
                      large: { width: 1840, height: 1000 },
                      medium: { width: 768, height: 280 },
                      small: { width: 480, height: 280 },
                    }}
                    helperText='prévia exibida em tamanhos em escala proporcional, não remete ao tamanho real da exibição.'
                    miniature={[
                      { title: 'Destaque da Vitrine', image: destaqueVitrine },
                    ]}
                  />
                </Grid>
                <Grid item>
                  <Divider />
                </Grid>
                <Grid item>
                  <ImageUploader
                    resolution={{
                      large: { width: 250, height: 250 },
                    }}
                    miniature={[
                      { title: 'Card da Vitrine', image: cardVitrine },
                      { title: 'Miniatura na tela de Curso', image: curso },
                      { title: 'Miniatura na tela de Aula', image: aula },
                    ]}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Fragment>
    );
  }
}