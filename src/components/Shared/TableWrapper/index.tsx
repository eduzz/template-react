import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

interface IProps {
  minWidth?: number;
  classes?: any;
}

interface IState {
  scrollEnded: boolean;
}

@WithStyles({
  root: {
    position: 'relative',
    overflow: 'hidden'
  },
  scrollable: {
    overflow: 'auto',
    width: '100%'
  },
  shadow: {
    position: 'absolute',
    right: '-1px',
    top: '0',
    bottom: '0',
    width: '1px',
    boxShadow: '0px 0px 15px 4px rgba(0, 0, 0, 0.3)',
    transition: '0.3s'
  },
  noShadow: {
    opacity: 0
  }
})
export default class TableWrapper extends PureComponent<IProps, IState> {
  root: HTMLDivElement;

  constructor(props: IProps) {
    super(props);
    this.state = { scrollEnded: true };
  }

  componentDidMount() {
    this.setState({ scrollEnded: this.root.clientWidth === this.root.scrollWidth });
    this.root.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onScroll);
  }

  componentWillUnmount() {
    this.root.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
  }

  onScroll = () => {
    const endScroll = this.root.scrollWidth - this.root.clientWidth - 10;
    this.setState({ scrollEnded: this.root.scrollLeft >= endScroll });
  }

  render() {
    const { scrollEnded } = this.state;
    const { classes, children, minWidth } = this.props;

    return (
      <div className={classes.root}>
        <div className={`${classes.shadow} ${scrollEnded ? classes.noShadow : ''}`}></div>
        <div className={classes.scrollable} ref={ref => this.root = ref}>
          <div style={({ minWidth: minWidth || 650 })}>
            {children}
          </div>
        </div>
      </div>

    );
  }
}