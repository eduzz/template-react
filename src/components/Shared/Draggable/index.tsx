import React from 'react';

interface IProps {
  className?: string;
}

interface IState {
  x: number;
  y: number;
}

export default class Draggable extends React.PureComponent<IProps, IState> {
  private style = {
    position: 'relative',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
  } as any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
    };
  }

  render() {
    const { className, ...otherProps } = this.props;
    const { x, y } = this.state;

    const dynamicStyle = {
      transform: `translate(${x}, ${y})`,
    };

    return (
      <div
        {...otherProps}
        className={className}
        style={{ ...this.style, ...dynamicStyle }}
      >
        {this.props.children}
      </div>
    );
  }
}