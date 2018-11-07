import React, { PureComponent } from 'react';
import { IForm } from '../..';
import Typography from '@material-ui/core/Typography';
import DRMOption from './DRMOption';
import Grid from '@material-ui/core/Grid';
import VideoDialog from './VideoDialog';
import { WithStyles } from 'decorators/withStyles';
import TextField from '@material-ui/core/TextField';

interface IProps {
  form: IForm;
  classes?: any;
}

@WithStyles({
  urlField: {
    color: 'red',
  },
})
export default class YoutubeVimeo extends PureComponent<IProps> {
  validateContent = (content: string) => {
    let vimeoRe = new RegExp('(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*');
    let youtubeRe = new RegExp('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i');

    return vimeoRe.test(content) || youtubeRe.test(content);
  }

  handleChange = (e: any) => {
    this.props.form.updateModel((model, v) => model.content = e.target.value)();
  }

  render() {
    const { form, classes } = this.props;
    const isContentValid = !form.model.content || this.validateContent(form.model.content);

    return (
      <Grid container direction='column'>
        <Grid item>
          <Typography variant='subtitle2' color='inherit' noWrap>Vídeo Aula</Typography>
          <TextField
            className={classes.urlField}
            error={!isContentValid}
            value={form.model.content}
            name='content'
            onChange={this.handleChange}
            margin='dense'
            fullWidth
            helperText={isContentValid ? 'Url do vídeo, ex: youtube.com/37e7e7 ou vimeo.com/87373' : 'Url inválida!'}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid container justify='space-between' direction='row'>
          <DRMOption form={form} />
          <VideoDialog content={isContentValid && form.model.content} />
        </Grid>
      </Grid>
    );
  }
}