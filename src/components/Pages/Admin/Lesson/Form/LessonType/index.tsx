import React, { PureComponent, Fragment } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { WithStyles } from 'decorators/withStyles';
import YoutubeIcon from 'mdi-react/YoutubeIcon';
import CodeTagsIcon from 'mdi-react/CodeTagsIcon';
import TextIcon from 'mdi-react/TextIcon';
import AudioIcon from 'mdi-react/AudioIcon';
import YoutubeVimeo from './YoutubeVimeo';
import { IForm } from '..';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

interface IProps {
  classes?: any;
  form: IForm;
}

interface IState {
  value: number;
}

@WithStyles(theme => ({
  container: {
    border: 'solid 1px #cfd4d9',
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
  },
  content: {
    padding: theme.spacing.unit * 2,
  }
}))
export default class LessonType extends PureComponent<IProps, IState> {
  handleChange = (event: any, value: number) => {
    this.props.form.updateModel((model) => model.lesson_type = { id: value })();
  }

  render() {
    const { classes, form } = this.props;

    return (
      <Fragment>
        <Typography variant='subtitle1' color='inherit' noWrap>Tipo de mídia</Typography>
        <Paper className={classes.container} elevation={0}>
          <Tabs
            value={form.model.lesson_type.id}
            onChange={this.handleChange}
            indicatorColor='secondary'
            textColor='secondary'
          >
            <Tab style={{ display: 'none' }} />
            <Tab icon={<YoutubeIcon />} label='Youtube/Vimeo' />
            <Tab icon={<CodeTagsIcon />} label='Embed' />
            <Tab style={{ display: 'none' }} />
            <Tab icon={<TextIcon />} label='Texto' />
            <Tab icon={<AudioIcon />} label='Áudio' />
          </Tabs>
          <div className={classes.content}>
            {form.model.lesson_type.id === 1 && <YoutubeVimeo form={form} />}
            {form.model.lesson_type.id === 2 && <YoutubeVimeo form={form} />}
            {form.model.lesson_type.id === 4 && <YoutubeVimeo form={form} />}
            {form.model.lesson_type.id === 5 && <YoutubeVimeo form={form} />}
          </div>
        </Paper>
      </Fragment>
    );
  }
}