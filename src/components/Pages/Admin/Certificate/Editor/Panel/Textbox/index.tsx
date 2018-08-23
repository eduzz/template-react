import React from 'react';
import { Rnd } from 'react-rnd';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  classes?: any;
  selected?: boolean;
  onMouseDown?: Function;
  id?: number;
  text?: string;
  style?: any;
}

@WithStyles(theme => ({
  selected: {
    border: 'solid 1px #424242',
  },
}))
export default class Textbox extends React.PureComponent<IProps> {
  static defaultProps = {
    fontSize: 12,
  };

  private default = {
    x: 10,
    y: 10,
    width: 120,
    height: 30,
  };

  handleMouseDown = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onMouseDown(this.props.id);
  }

  handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const { classes, selected, text, style } = this.props;

    return (
      <Rnd
        className={selected && classes.selected}
        default={this.default}
        onMouseDown={this.handleMouseDown}
        onClick={this.handleClick}
        style={style}
      >
        <span>{text}</span>
      </Rnd>
    );
  }
}