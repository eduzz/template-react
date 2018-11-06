import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { WithStyles } from 'decorators/withStyles';
import YoutubeIcon from 'mdi-react/YoutubeIcon';
import CodeTagsIcon from 'mdi-react/CodeTagsIcon';
import TextIcon from 'mdi-react/TextIcon';
import AudioIcon from 'mdi-react/AudioIcon';
import YoutubeVimeo from './YoutubeVimeo';
import { IForm } from '..';

interface IProps {
  classes?: any;
  form: IForm;
}

interface IState {
  value: number;
}

@WithStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 640,
  },
})
export default class LessonType extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  handleChange = (event: any, value: number) => {
    this.setState({ value });
  }

  render() {
    const { classes, form } = this.props;
    const { value } = this.state;

    return (
      <Paper square className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor='secondary'
          textColor='secondary'
        >
          <Tab icon={<YoutubeIcon />} label='Youtube/Vimeo' />
          <Tab icon={<CodeTagsIcon />} label='Embed' />
          <Tab icon={<TextIcon />} label='Texto' />
          <Tab icon={<AudioIcon />} label='Áudio' />
        </Tabs>
        {value === 0 && <YoutubeVimeo form={form} />}
        {value === 1 && <YoutubeVimeo form={form} />}
        {value === 2 && <YoutubeVimeo form={form} />}
        {value === 3 && <YoutubeVimeo form={form} />}
      </Paper>
    );
  }
}