import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import Textbox from './Textbox';
import { ITextBox } from './Textbox';
import { EditorContext } from '../';

interface IProps {
  classes?: any;
  onChange?: any;
  context?: any;
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
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}))
class Panel extends React.Component<IProps, IState> {
  private panelEl: any;

  constructor(props: IProps) {
    super(props);

    this.panelEl = React.createRef();
  }

  componentDidMount = () => {
    this.handleChange();
  }

  componentDidUpdate() {
    this.handleChange();
  }

  handleDismiss = (e: any) => {
    this.setState({
      selectedItem: null,
    });
  }

  handleChange = () => {
    this.props.onChange(this.panelEl.current.outerHTML);
  }

  handlePlacementChange = (placement: any) => {
    this.props.context.setPlacement(placement);

    this.handleChange();
  }

  render() {
    const { classes, context } = this.props;

    return (
      <div className={classes.root} onClick={context.dismiss} ref={this.panelEl}>
        <img
          alt=''
          src={context.backgroundImage}
          className={classes.backgroundImage}
        />

        {context.items.map((item: any) => {
          const { id, text, placement, ...style } = item;

          return (
            <Textbox
              key={id}
              id={id}
              text={text}
              style={style}
              placement={placement}
              onChange={this.handlePlacementChange}
              selected={context.selectedItem === id}
              onMouseDown={context.select}
            />
          );
        })}
      </div>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <EditorContext.Consumer>
    {context => <Panel {...props} context={context} {...ref} />}
  </EditorContext.Consumer>
));