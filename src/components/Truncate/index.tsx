import { PureComponent } from 'react';

interface IState {
  text: string;
}

interface IProps {
  count: number;
  final?: string;
  upper?: boolean;
  lower?: boolean;
  children: string;
}

export default class Truncate extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { text: '' };
  }

  static getDerivedStateFromProps(props: IProps): IState {
    const { count, upper, lower } = props;
    const final = props.final || '...';

    let text = props.children;

    if (!text || text.length < count) {
      return { text };
    }

    text = text.substr(0, count) + final;

    if (upper) {
      return { text: text.toUpperCase() };
    }

    if (lower) {
      return { text: text.toLowerCase() };
    }

    return { text };
  }

  render() {
    return this.state.text;
  }

}
