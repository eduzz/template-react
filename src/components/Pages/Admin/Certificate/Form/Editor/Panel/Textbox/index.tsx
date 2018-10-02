import { WithStyles } from 'decorators/withStyles';
import React, { SyntheticEvent } from 'react';
import { Draggable, Resizable } from 'react-transforming';

import { IEditorItem } from '../../interfaces';

interface IProps {
  selected: boolean;
  onMouseDown: (id: number) => void;
  onDoubleClick: (id: number) => void;
  onChange: (value: IEditorItem['placement']) => void;
  id: number;
  text: string;
  placement: IEditorItem['placement'];
  scale: number;
  style?: any;
  classes?: any;
}

interface IState {
  hover: boolean;
}

@WithStyles({
  border: {
    border: 'dashed 2px transparent',
  },
  selected: {
    borderColor: '#424242',
    '& > span': {
      width: '24px !important',
      height: '24px !important',
      top: 'calc(100% - 14px) !important',
      left: 'calc(100% - 14px) !important',
      backgroundColor: '#424242',
    }
  },
})
export default class Textbox extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    fontSize: 12,
    scale: 1,
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      hover: false
    };
  }

  handleMouseDown = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onMouseDown(this.props.id);
  }

  handleMouseOver = () => {
    this.setState({ hover: true });
  }

  handleMouseOut = () => {
    this.setState({ hover: false });
  }

  handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDoubleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onDoubleClick(this.props.id);
  }

  handleResizeStop = (e: SyntheticEvent, size: { width: number; height: number; }) => {
    const result = { ...this.props.placement, ...size };
    this.props.onChange(result);
  }

  handleDragStop = (e: SyntheticEvent, props: { x: number, y: number }) => {
    const result = { ...this.props.placement, ...{ x: props.x, y: props.y } };
    this.props.onChange(result);
  }

  render() {
    const { classes, selected, text, style, scale, placement } = this.props;
    const { hover } = this.state;

    return (
      <div onDoubleClick={this.handleDoubleClick}>
        <Draggable
          default={placement}
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
            default={placement}
            onResizeStop={this.handleResizeStop}
            scale={scale}
          >
            <span dangerouslySetInnerHTML={{ __html: text }} />
          </Resizable>
        </Draggable>
      </div>
    );
  }
}