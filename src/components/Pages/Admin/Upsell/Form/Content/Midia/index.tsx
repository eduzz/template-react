import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import aula from 'assets/images/aula.png';
import cardVitrine from 'assets/images/card-vitrine.png';
import curso from 'assets/images/curso.png';
import destaqueVitrine from 'assets/images/destaque-vitrine.png';
import React, { Fragment, PureComponent } from 'react';

import { IUpsellFormContext, UpsellFormContext } from '../../Context';
import ActionButtons from '../ActionButtons';
import ImageUploader from './ImageUploader';

interface IProps {
}

export default class Midia extends PureComponent<IProps> {
  static contextType = UpsellFormContext;
  public context: IUpsellFormContext;

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
    const { model, isFormValid } = this.context;

    return (
      <Card>
        <CardContent >
          <Grid container direction='column' spacing={16}>
            <Grid item>
              <Typography variant='subtitle1'>
                <strong>Mídias</strong>
              </Typography>
              <Typography variant='caption'>
                Insira as imagens necessárias
            </Typography>
            </Grid>
            <Grid item>
              <Grid container direction='column' spacing={32}>
                {!model.highlight && !model.offer_shelf && !model.has_selected_courses && !model.has_selected_lessons &&
                  <Grid item>
                    <Typography>Selecione ao menos um tipo de Audiência</Typography>
                  </Grid>
                }
                {model.highlight &&
                  <Grid item>
                    <ImageUploader
                      error={!isFormValid && !model.highlight_images.large}
                      resolution={{
                        large: { width: 1840, height: 460, image: model.highlight_images.large },
                        medium: { width: 768, height: 280, image: model.highlight_images.medium },
                        small: { width: 480, height: 280, image: model.highlight_images.small },
                      }}
                      onUploaded={this.handleUploadedHighlight}
                      onRemoved={this.handleRemovedHighlight}
                      helperText='prévia exibida em tamanhos em escala proporcional, não remete ao tamanho real da exibição.'
                      miniature={[
                        { title: 'Destaque da Vitrine', image: destaqueVitrine },
                      ]}
                    />
                  </Grid>
                }

                {(model.offer_shelf || model.has_selected_courses || model.has_selected_lessons) &&
                  <Fragment>
                    {model.highlight &&
                      <Grid item>
                        <Divider />
                      </Grid>
                    }
                    <Grid item>
                      <ImageUploader
                        error={!isFormValid && !model.small_image}
                        resolution={{
                          large: { width: 250, height: 250, image: model.small_image },
                        }}
                        onUploaded={this.handleUploadedSmallImage}
                        onRemoved={this.handleRemovedSmallImage}
                        miniature={[
                          { title: 'Card da Vitrine', image: cardVitrine },
                          { title: 'Miniatura na tela de Curso', image: curso },
                          { title: 'Miniatura na tela de Aula', image: aula },
                        ]}
                      />
                    </Grid>
                  </Fragment>
                }
              </Grid>
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