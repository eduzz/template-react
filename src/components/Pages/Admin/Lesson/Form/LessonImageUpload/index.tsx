import React, { PureComponent, Fragment } from 'react';
import ImageUploader from 'components/Pages/Admin/Upsell/Form/ImageUploader';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  classes?: any;
}

@WithStyles({
  title: {
    marginBottom: 8,
  },
})
export default class LessonImageUpload extends PureComponent<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography className={classes.title} variant='subtitle1' color='inherit' noWrap>Imagem Principal</Typography>
        <ImageUploader
          width={160}
          height={120}
        />
      </Fragment>
    );
  }
}