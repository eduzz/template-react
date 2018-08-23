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
    width: '700px',
    height: '700px',
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
        {(value: any) =>
          <div className={classes.root} onClick={value.dismiss}>
            {value.items.map((item: any) =>
              <Textbox
                key={item.id}
                id={item.id}
                text={item.text}
                fontSize={item.fontSize}
                selected={value.selectedItem === item.id}
                onMouseDown={value.select}
              />
            )}
          </div>
        }
      </EditorContext.Consumer>
    );
  }
}