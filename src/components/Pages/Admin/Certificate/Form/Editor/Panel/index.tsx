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
    position: 'relative',
  },
  panel: {
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
  private containerEl: any;

  constructor(props: IProps) {
    super(props);

    this.panelEl = React.createRef();
    this.containerEl = React.createRef();
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
    const panelStyle = {
      width: 800,
      height: 600,
    };
    const containerStyle = this.containerEl.current && {
      // transform: `scale(${this.containerEl.current.offsetWidth / this.panelEl.current.offsetWidth})`,
      transformOrigin: 'top left',
    };

    return (
      <div className={classes.root} style={containerStyle} ref={this.containerEl}>
        <div className={classes.panel} onClick={context.dismiss} ref={this.panelEl} style={panelStyle}>
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
                scale={this.containerEl.current.offsetWidth / this.panelEl.current.offsetWidth}
                placement={placement}
                onChange={this.handlePlacementChange}
                selected={context.selectedItem === id}
                onMouseDown={context.select}
              />
            );
          })}
        </div>
      </div >
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <EditorContext.Consumer>
    {context => <Panel {...props} context={context} {...ref} />}
  </EditorContext.Consumer>
));