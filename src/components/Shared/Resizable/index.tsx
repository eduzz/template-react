import React from 'react';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
}

interface IState {
  width: number;
  height: number;
}

export default class Resizable extends React.PureComponent<IProps, IState> {
  private style = {
    position: 'relative',
  } as any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      width: this.props.width || 0,
      height: this.props.height || 0,
    };
  }

  render() {
    const { className, ...otherProps } = this.props;
    const { width, height } = this.state;

    const dynamicStyle = {
      width,
      height,
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