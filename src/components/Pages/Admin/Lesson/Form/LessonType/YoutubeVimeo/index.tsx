import React, { PureComponent } from 'react';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { IForm } from '../..';
import Typography from '@material-ui/core/Typography';
import DRMOption from './DRMOption';
import Grid from '@material-ui/core/Grid';
import VideoDialog from './VideoDialog';

interface IProps {
  form: IForm;
}

export default class YoutubeVimeo extends PureComponent<IProps> {
  render() {
    const { form } = this.props;

    return (
      <Grid container direction='column'>
        <Grid item>
          <Typography variant='subtitle2' color='inherit' noWrap>Vídeo Aula</Typography>
          <FieldText
            value={form.model.content}
            name='content'
            onChange={form.updateModel((model, v) => model.content = v)}
            margin='dense'
            fullWidth
            helperText={'Url do vídeo, ex: youtube.com/37e7e7 ou vimeo.com/87373'}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid container justify='space-between' direction='row'>
          <DRMOption form={form} />
          <VideoDialog content={form.model.content} />
        </Grid>
      </Grid>
    );
  }
}