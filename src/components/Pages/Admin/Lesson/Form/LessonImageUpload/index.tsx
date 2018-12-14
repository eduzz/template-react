import React, { PureComponent, Fragment } from 'react';
import ImageUploader from 'components/Pages/Admin/Upsell/FormLegacy/ImageUploader';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import { IForm } from '..';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles({
  title: {
    marginBottom: 8,
  },
})
export default class LessonImageUpload extends PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <Fragment>
        <Typography className={classes.title} variant='subtitle1' color='inherit' noWrap>Imagem Principal</Typography>
        <ImageUploader
          width={160}
          height={120}
          classes={classes.ImageUploader}
          value={form.model.image}
          onChange={form.updateModel((model, v) => model.image = v)}
        />
      </Fragment>
    );
  }
}