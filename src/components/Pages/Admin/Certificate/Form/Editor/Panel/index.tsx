import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent, RefObject } from 'react';

import { CERTIFICATE_SIZE } from '../config';
import EditorContext from '../context';
import { IEditorContext, IEditorItem } from '../interfaces';
import generateOutputHTML from './helper';
import Textbox from './Textbox';

interface IState {
  scale: number;
  wrapperStyle: any;
  containerStyle: any;
  outputHtml: string;
}

interface IProps {
  onChange: (html: string) => void;
  classes?: any;
  context?: IEditorContext;
}

@WithStyles({
  root: {
    position: 'relative',
    marginBottom: 16,
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
})
class Panel extends PureComponent<IProps, IState> {
  private panelEl: RefObject<HTMLDivElement>;
  private containerEl: RefObject<HTMLDivElement>;
  private panelStyle = { ...CERTIFICATE_SIZE };

  constructor(props: IProps) {
    super(props);

    this.panelEl = React.createRef();
    this.containerEl = React.createRef();

    this.state = {
      scale: 1,
      outputHtml: '',
      wrapperStyle: {},
      containerStyle: {
        transform: `scale(1)`,
        transformOrigin: 'top left'
      }
    };
  }

  componentDidMount = () => {
    this.handleChange();

    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentDidUpdate() {
    this.handleChange();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const scale = this.containerEl.current.offsetWidth / this.panelEl.current.offsetWidth;

    if (scale === this.state.scale) return;

    this.setState({
      scale,
      containerStyle: { ...this.state.containerStyle, transform: `scale(${scale})` },
      wrapperStyle: { height: this.panelStyle.height * scale }
    });
  }

  handleChange = () => {
    const outputHtml = generateOutputHTML(this.panelEl.current.outerHTML);
    if (outputHtml === this.state.outputHtml) return;

    this.setState({ outputHtml });
    this.props.onChange(outputHtml);
  }

  handlePlacementChange = (placement: IEditorItem['placement']) => {
    this.props.context.setPlacement(placement);
    this.handleChange();
  }

  render() {
    const { classes, context } = this.props;
    const { containerStyle, wrapperStyle, scale } = this.state;

    return (
      <div style={wrapperStyle}>
        <div className={classes.root} style={containerStyle} ref={this.containerEl}>
          <div className={classes.panel} onClick={context.dismiss} ref={this.panelEl} style={this.panelStyle}>
            <img src={context.image} className={classes.backgroundImage} />

            {context.items.map(item => {
              const { id, text, placement, ...style } = item;

              return (
                <Textbox
                  key={id}
                  id={id}
                  text={text}
                  style={style}
                  scale={scale}
                  placement={placement}
                  onChange={this.handlePlacementChange}
                  selected={context.selectedItem === id}
                  onMouseDown={context.select}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <EditorContext.Consumer>
    {context => <Panel {...props} context={context} {...ref} />}
  </EditorContext.Consumer>
));