import Grid from '@material-ui/core/Grid';
import { WithStyles } from 'decorators/withStyles';
import React, { Fragment } from 'react';

import EditorContext from '../context';
import { IEditorContext, IEditorItem } from '../interfaces';
import Add from './Add';
import ColorPicker from './ColorPicker';
import FontFamily from './FontFamily';
import FontSize from './FontSize';
import HorizontalAlignment from './HorizontalAlignment';
import ImageUpload from './ImageUpload';
import Placeholders from './Placeholders';
import Remove from './Remove';
import TextDialog from './TextDialog';
import VerticalAlignment from './VerticalAlignment';

interface IProps {
  classes?: any;
  context?: IEditorContext;
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
  }
}))
class Toolbar extends React.PureComponent<IProps> {
  handleChange = (value: IEditorItem) => {
    this.props.context.modify(value);
  }

  render() {
    const { classes, context } = this.props;

    return (
      <Fragment>
        <TextDialog
          opened={context.openedEditText}
          value={context.getCurrentConfig('text')}
          onChange={this.handleChange}
        />

        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <FontSize
              value={context.getCurrentConfig('fontSize')}
              onChange={this.handleChange}
            />
            <FontFamily
              value={context.getCurrentConfig('fontFamily')}
              onChange={this.handleChange}
            />
            <Placeholders
              onChange={context.add}
            />
          </Grid>
          <Grid item>
            <HorizontalAlignment
              value={context.getCurrentConfig('justifyContent')}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item>
            <VerticalAlignment
              value={context.getCurrentConfig('alignItems')}
              onChange={this.handleChange}
            />
          </Grid>
          <ColorPicker
            value={context.getCurrentConfig('color')}
            onChange={this.handleChange}
          />
          <Grid item>
            <ImageUpload
              onChange={context.setImage}
            />
          </Grid>
          <Grid item>
            <Add onClick={context.add} />
            <Remove
              disabled={!context.selectedItem}
              onClick={context.remove}
            />
          </Grid>
        </Grid >

      </Fragment>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <EditorContext.Consumer>
    {context => <Toolbar {...props} context={context} {...ref} />}
  </EditorContext.Consumer>
));