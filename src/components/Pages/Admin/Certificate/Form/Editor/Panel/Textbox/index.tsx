import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import Draggable from 'components/Shared/Draggable';
import Resizable from 'components/Shared/Resizable';

export interface ITextBox {
  id: number;
  text: string;
  fontSize?: number;
}

interface IProps {
  classes?: any;
  selected?: boolean;
  onMouseDown?: Function;
  onChange?: any;
  id?: number;
  text?: string;
  placement: any;
  style?: any;
  scale?: any;
}

interface IState {
  hover: boolean;
  placement: any;
}

@WithStyles(theme => ({
  selected: {
    border: 'solid 1px #424242',
  },
}))
export default class Textbox extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    fontSize: 12,
    scale: 1,
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      hover: false,
      placement: { ...this.props.placement },
    };
  }

  handleMouseDown = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onMouseDown(this.props.id);
  }

  handleMouseOver = () => {
    this.setState({
      hover: true,
    });
  }

  handleMouseOut = () => {
    this.setState({
      hover: false,
    });
  }

  handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleResizeStop = (e: any, dir: any, refToElement: any) => {
    const { onChange } = this.props;
    const { placement } = this.state;

    const size = {
      width: refToElement.offsetWidth,
      height: refToElement.offsetHeight,
    };

    const result = { ...placement, ...size };

    this.setState({
      placement: result,
    });

    onChange && onChange(result);
  }

  handleDrag = (event: any, d: any) => {
    console.log(d);

    // const placement = {
    //   ...this.state.placement,
    //   x: d.x / this.props.scale,
    //   y: d.y / this.props.scale,
    // };

    // this.setState({
    //   placement,
    // });
  }

  handleDragStop = (e: any, props: any) => {
    const { onChange } = this.props;
    const { placement } = this.state;

    const position = {
      x: props.x,
      y: props.y,
    };

    const result = { ...placement, ...position };

    this.setState({
      placement: result,
    });

    onChange && onChange(result);
  }

  render() {
    return (
      <Resizable
        width={100}
        height={100}
      >
        <Draggable>
          <div style={{ backgroundColor: 'red' }}>
            test
          </div>
        </Draggable>
      </Resizable>
    );
  }

  // render() {
  //   const { classes, selected, text, style } = this.props;
  //   const { hover } = this.state;

  //   const { x, y } = this.state.placement;

  //   return (
  //     <Rnd
  //       className={(selected || hover) && classes.selected}
  //       default={this.state.placement}
  //       position={{ x, y }}
  //       onMouseDown={this.handleMouseDown}
  //       onMouseOver={this.handleMouseOver}
  //       onMouseOut={this.handleMouseOut}
  //       onDrag={this.handleDrag}
  //       onResizeStop={this.handleResizeStop}
  //       onDragStop={this.handleDragStop}
  //       onClick={this.handleClick}
  //       style={style}
  //     >
  //       <span>{text}</span>
  //     </Rnd>
  //   );
  // }
}