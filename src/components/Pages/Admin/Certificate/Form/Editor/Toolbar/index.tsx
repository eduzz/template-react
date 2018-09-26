import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import React from 'react';

import { EditorContext } from '../';
import Add from './Add';
import ColorPicker from './ColorPicker';
import FontFamily from './FontFamily';
import FontSize from './FontSize';
import HorizontalAlignment from './HorizontalAlignment';
import ImageUpload from './ImageUpload';
import Placeholders from './Placeholders';
import Remove from './Remove';
import TextEdit from './TextEdit';
import VerticalAlignment from './VerticalAlignment';

interface IProps {
  classes?: any;
  context?: any;
}

@WithStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    margin: '8px 0 8px 0',
  },
  button: {
    borderRadius: 0,
    width: 30,
  },
  icon: {
    width: 43,
    height: 43,
    border: 'solid 1px black',
    padding: 8,
  },
  link: {
    padding: '16px 0 16px 0',
  },
}))
class Toolbar extends React.PureComponent<IProps> {
  handleChange = (value: any) => {
    this.props.context.modify(value);
  }

  render() {
    const { classes, context } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item>
          <FontSize
            value={context.current('fontSize')}
            onChange={this.handleChange}
          />
          <FontFamily
            value={context.current('fontFamily')}
            onChange={this.handleChange}
          />
          <Placeholders
            onChange={context.add}
          />
        </Grid>
        <Grid item>
          <HorizontalAlignment
            value={context.current('justifyContent')}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item>
          <VerticalAlignment
            value={context.current('alignItems')}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item>
          <TextEdit
            value={context.current('text')}
            onChange={this.handleChange}
          />
        </Grid>
        <ColorPicker
          value={context.current('color')}
          onChange={this.handleChange}
        />
        <ImageUpload
          onChange={context.setImage}
        />
        <Grid item>
          <Add onClick={context.add} />
          <Remove
            disabled={!context.selectedItem}
            onClick={context.remove}
          />
        </Grid>
        <Grid item className={classes.link}>
          <Typography>
            Para baixar um modelo de certificado <a href='https://cdn.nutror.com/certificado_default_nutror.psd'>clique aqui</a>
          </Typography>
        </Grid>
      </Grid >
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <EditorContext.Consumer>
    {context => <Toolbar {...props} context={context} {...ref} />}
  </EditorContext.Consumer>
));