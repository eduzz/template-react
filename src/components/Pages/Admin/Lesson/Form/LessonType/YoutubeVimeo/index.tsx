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
  getContentType = (content: string) => {
    let vimeoRe = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
    let youtubeRe = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11,})(?:\S+)?$/;

    if (vimeoRe.test(content))
      return 'vimeo';
    if (youtubeRe.test(content))
      return 'youtube';

    return '';
  }

  getEmbedByContent = (type: string, content: string) => {
    let matches = [];

    switch (type) {
      case 'youtube':
        matches =
          content.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11,})(?:\S+)?$/);

        if (matches && matches.length)
          return (
            <iframe
              src={`https://youtube.com/embed/${matches[1]}`}
              frameBorder='0'
              allowFullScreen
              scrolling='no'
              width='100%'
              height={350}
            />
          );
        return null;
      case 'vimeo':
        matches = content.match(/(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);

        if (matches && matches.length)
          return (
            <iframe
              src={`https://player.vimeo.com/video/${matches[5]}`}
              frameBorder='0'
              allowFullScreen
              width='100%'
              height={350}
            />
          );
        return null;
      default:
        return null;
    }
  }

  handleChange = (e: any) => {
    this.props.form.updateModel((model, v) => model.content[model.lesson_type.id] = e.target.value)();
  }

  render() {
    const { form, classes } = this.props;
    const content = form.model.content[form.model.lesson_type.id];
    const contentType = this.getContentType(content);
    const embed = this.getEmbedByContent(contentType, content);

    return (
      <Grid container direction='column'>
        <Grid item>
          <Typography variant='subtitle2' color='inherit' noWrap>Vídeo Aula</Typography>
          <TextField
            className={classes.urlField}
            error={content && !embed}
            value={content}
            name='content'
            onChange={this.handleChange}
            margin='dense'
            fullWidth
            helperText={content && !embed ? 'Url inválida!' : 'Url do vídeo, ex: youtube.com/37e7e7 ou vimeo.com/87373'}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid container justify='space-between' direction='row'>
          <DRMOption form={form} />
          <VideoDialog embed={embed} />
        </Grid>
      </Grid>
    );
  }
}