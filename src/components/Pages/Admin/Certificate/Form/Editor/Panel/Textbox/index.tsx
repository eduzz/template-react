import React from 'react';
import { WithStyles } from 'decorators/withStyles';
<<<<<<< HEAD
import { Draggable, Resizable } from 'react-transforming';
=======
import Draggable from 'components/Shared/Draggable';
import Resizable from 'components/Shared/Resizable';
>>>>>>> Create Draggable and Resizable components

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
  border: {
    border: 'solid 1px transparent',
  },
  selected: {
    borderColor: '#424242',
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

  handleResizeStop = (e: any, size: any) => {
    const { onChange } = this.props;
    const { placement } = this.state;

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
    const { classes, selected, text, style, scale } = this.props;
    const { hover } = this.state;

    return (
      <Draggable
        default={this.state.placement}
        className={`${classes.border} ${(selected || hover) ? classes.selected : ''}`}
        onMouseDown={this.handleMouseDown}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onDragStop={this.handleDragStop}
        onClick={this.handleClick}
        scale={scale}
      >
        <Resizable
          style={style}
          default={this.state.placement}
          onResizeStop={this.handleResizeStop}
          scale={scale}
        >
          <span>{text}</span>
        </Resizable>
      </Draggable>
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