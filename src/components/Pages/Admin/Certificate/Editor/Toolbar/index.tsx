import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import { EditorContext } from '../';
import FontSize from './FontSize';
import HorizontalAlignment from './HorizontalAlignment';
import VerticalAlignment from './VerticalAlignment';
import TextEdit from './TextEdit';
import ColorPicker from './ColorPicker';

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
  selected: {

  }
}))
class Toolbar extends React.PureComponent<IProps> {
  handleChange = (label: string, value: any) => {
    this.props.context.modify(label, value);
  }

  render() {
    const { classes, context } = this.props;

    return (
      <form className={classes.root}>
        <FontSize
          value={context.current('fontSize')}
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
          value={context.getText()}
          onChange={context.setText}
        />
      </form>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <EditorContext.Consumer>
    {(context: any) => <Toolbar {...props} context={context} {...ref} />}
  </EditorContext.Consumer>
));