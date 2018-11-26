
import React, { PureComponent, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { IForm } from '../../../';
import { WithStyles } from 'decorators/withStyles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ImageUploader from 'components/Pages/Admin/Upsell/FormLegacy/ImageUploader';
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
        <Typography variant='subtitle1' color='inherit' noWrap>Personalizações de Login</Typography>
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <Typography variant='subtitle1' color='inherit' noWrap>Logotipo</Typography>
            <ImageUploader
              width={140}
              height={40}
              classes={classes.ImageUploader}
              value={form.model.customization.customizationData.logo_login}
              onChange={form.updateModel((model, v) => model.customization.customizationData.logo_login = v)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='subtitle1' color='inherit' noWrap>Imagem de Fundo</Typography>
            <ImageUploader
              width={1750}
              height={1400}
              classes={classes.ImageUploader}
              value={form.model.customization.customizationData.login_background_image}
              onChange={form.updateModel((model, v) => model.customization.customizationData.login_background_image = v)}
            />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={16}>
          <Grid item>
            <Typography variant='subtitle1' color='inherit' noWrap>Cor de fundo da página</Typography>
            <ColorPicker
              value={form.model.customization.customizationData.login_background_color}
              onChange={form.updateModel((model, v) => model.customization.customizationData.login_background_color = v.color)}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}