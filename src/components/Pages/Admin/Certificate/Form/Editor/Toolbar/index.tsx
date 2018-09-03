import CardContent from '@material-ui/core/CardContent';
import { WithStyles } from 'decorators/withStyles';
import React from 'react';

import { EditorContext } from '../';
import Add from './Add';
import ColorPicker from './ColorPicker';
import FontFamily from './FontFamily';
import FontSize from './FontSize';
import HorizontalAlignment from './HorizontalAlignment';
import Remove from './Remove';
import Save from './Save';
import TextEdit from './TextEdit';
import VerticalAlignment from './VerticalAlignment';
import ImageUpload from './ImageUpload';
import Placeholders from './Placeholders';

interface IProps {
  classes?: any;
  context?: any;
}

@WithStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 8,
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
}))
class Toolbar extends React.PureComponent<IProps> {
  handleChange = (value: any) => {
    this.props.context.modify(value);
  }

  render() {
    const { classes, context } = this.props;

    return (
      <CardContent>
        <div className={classes.root}>
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
          <HorizontalAlignment
            value={context.current('justifyContent')}
            onChange={this.handleChange}
          />
          <VerticalAlignment
            value={context.current('alignItems')}
            onChange={this.handleChange}
          />
          <ColorPicker
            value={context.current('color')}
            onChange={this.handleChange}
          />
          <TextEdit
            value={context.current('text')}
            onChange={this.handleChange}
          />
          <ImageUpload
            onChange={context.setBackgroundImage}
          />
          <Add onClick={context.add} />
          <Remove
            disabled={!context.selectedItem}
            onClick={context.remove}
          />
          <Save
            onClick={context.save}
          />
        </div>
      </CardContent>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <EditorContext.Consumer>
    {context => <Toolbar {...props} context={context} {...ref} />}
  </EditorContext.Consumer>
));