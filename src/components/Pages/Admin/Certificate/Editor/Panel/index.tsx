import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import Textbox from './Textbox';
import { ITextBox } from 'interfaces/textBox';
import { EditorContext } from '../';

interface IProps {
  classes?: any;
  onRef?: Function;
}

interface IState {
  selectedItem: number | null;
  items: Array<ITextBox>;
}

@WithStyles(theme => ({
  root: {
    width: '100%',
    height: 800,
    backgroundColor: '#cecece',
    position: 'relative',
    overflow: 'hidden',
  },
}))
export default class Panel extends React.Component<IProps, IState> {
  handleDismiss = (e: any) => {
    this.setState({
      selectedItem: null,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <EditorContext.Consumer>
        {(context: any) =>
          <div className={classes.root} onClick={context.dismiss}>
            {context.items.map((item: any) =>
              <Textbox
                key={item.id}
                id={item.id}
                text={item.text}
                style={item.style}
                selected={context.selectedItem === item.id}
                onMouseDown={context.select}
              />
            )}
          </div>
        }
      </EditorContext.Consumer>
    );
  }
}