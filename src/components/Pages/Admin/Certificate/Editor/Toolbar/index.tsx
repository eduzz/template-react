import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import { EditorContext } from '../';
import FontSize from './FontSize';
import HorizontalAlignment from './HorizontalAlignment';
import VerticalAlignment from './VerticalAlignment';
import TextEdit from './TextEdit';
import ColorPicker from './ColorPicker';
import Remove from './Remove';
import Add from './Add';
import FontFamily from './FontFamily';
import Save from './Save';

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
      <form className={classes.root}>
        <FontSize
          value={context.current('fontSize')}
          onChange={this.handleChange}
        />
        <FontFamily
          value={context.current('fontFamily')}
          onChange={this.handleChange}
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
        <Add onClick={context.add} />
        <Remove
          disabled={!context.selectedItem}
          onClick={context.remove}
        />
        <Save
          onClick={context.save}
        />
      </form>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <EditorContext.Consumer>
    {context => <Toolbar {...props} context={context} {...ref} />}
  </EditorContext.Consumer>
));