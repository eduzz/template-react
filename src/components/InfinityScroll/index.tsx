import { Component } from 'react';

interface IProps {
  defaultPageNumber?: number;
  onScrollToBottom?: Function;
  totalPages: number;
}

interface IState {
  pageNumber: number;
}

class InfinityScroll extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      pageNumber: 1,
    };
  }

  getDerivedStateFromProps(nextProps: IProps) {
    return {
      pageNumber: nextProps.defaultPageNumber,
    };
  }

  handleScrollToBottom = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.state.pageNumber < this.props.totalPages) {
      this.setState({
        pageNumber: this.state.pageNumber + 1,
      });

      this.props.onScrollToBottom(this.state.pageNumber);
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScrollToBottom.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScrollToBottom);
  }

  render() {
    return this.props.children;
  }
}

export default InfinityScroll;