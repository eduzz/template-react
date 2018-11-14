import React, { PureComponent, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import LayoutOption from './LayoutOption';
import { IForm } from '../../../';
import { WithStyles } from 'decorators/withStyles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ImageUploader from 'components/Pages/Admin/Upsell/Form/ImageUploader';
import ColorPicker from '../ColorPicker';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles({
  divider: {
    margin: '32px 0 24px 0',
  },
})
export default class Course extends PureComponent<IProps> {
  render() {
    const { form, classes } = this.props;

    return (
      <Fragment>
        <Typography variant='subtitle1' color='inherit' noWrap>Personalizações de Curso</Typography>
        <LayoutOption form={form} />
        <Divider className={classes.divider} />
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <Typography variant='subtitle1' color='inherit' noWrap>Logomarca</Typography>
            <ImageUploader
              width={120}
              height={40}
              classes={classes.ImageUploader}
              value={form.model.logo}
              onChange={form.updateModel((model, v) => model.logo = v)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='subtitle1' color='inherit' noWrap>Identificação do Curso</Typography>
            <ImageUploader
              width={300}
              height={300}
              classes={classes.ImageUploader}
              value={form.model.customization.avatar}
              onChange={form.updateModel((model, v) => model.customization.avatar = v)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='subtitle1' color='inherit' noWrap>Banner de Capa</Typography>
            <ImageUploader
              width={1920}
              height={400}
              classes={classes.ImageUploader}
              value={form.model.customization.image_cover}
              onChange={form.updateModel((model, v) => model.customization.image_cover = v)}
            />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={16}>
          <Grid item>
            <Typography variant='subtitle1' color='inherit' noWrap>Cor de Fundo do Cabeçalho</Typography>
            <ColorPicker
              value={form.model.customization.customizationData.header_background_color}
              onChange={form.updateModel((model, v) => model.customization.customizationData.header_background_color = v.color)}
            />
          </Grid>
          <Grid item>
            <Typography variant='subtitle1' color='inherit' noWrap>Cor de Fundo da Capa</Typography>
            <ColorPicker
              value={form.model.customization.customizationData.cover_background_color}
              onChange={form.updateModel((model, v) => model.customization.customizationData.cover_background_color = v.color)}
            />
          </Grid>
          <Grid item>
            <Typography variant='subtitle1' color='inherit' noWrap>Cor do Título do Curso</Typography>
            <ColorPicker
              value={form.model.customization.customizationData.title_color}
              onChange={form.updateModel((model, v) => model.customization.customizationData.title_color = v.color)}
            />
          </Grid>
          <Grid item>
            <Typography variant='subtitle1' color='inherit' noWrap>Cor dos Links do Cabeçalho</Typography>
            <ColorPicker
              value={form.model.customization.customizationData.header_link_color}
              onChange={form.updateModel((model, v) => model.customization.customizationData.header_link_color = v.color)}
            />
          </Grid>
          <Grid item>
            <Typography variant='subtitle1' color='inherit' noWrap>Cor da Descrição do Curso</Typography>
            <ColorPicker
              value={form.model.customization.customizationData.course_description_color}
              onChange={form.updateModel((model, v) => model.customization.customizationData.course_description_color = v.color)}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}