import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui/Progress';

const styles = require('./styles.css');

class Progress extends Component<any, any> {
  private interval: NodeJS.Timer;

  constructor(props: any) {
    super(props);

    this.state = {
      progress: 0,
      display: true,
    };
  }

  componentWillReceiveProps(nextProps: any) {
    clearInterval(this.interval);

    if (nextProps.loading.qtdRequestLoading) {
      this.interval = setInterval(() => {
        this.setState({
          progress: this.state.progress + 1,
          display: true,
        });
      }, 100);
    } else {
      this.setState({
        progress: 100,
      });

      setTimeout(() => {
        this.setState({
          progress: 0,
          display: false,
        });
      }, 500);
    }
  }

  render() {
    return (
      this.state.display && <div className={styles.component}>
        <LinearProgress className='progress' variant='determinate' value={this.state.progress} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loading: state.loading,
});

export default connect(mapStateToProps)(Progress);