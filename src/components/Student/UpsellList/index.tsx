import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUpsells } from 'actionCreators/upsells';
import UpsellCard from './UpsellCard';

interface IProps {
  courseID: number;
  upsells: Array<any>;
  fetchUpsells: any;
}

class UpsellList extends Component<IProps> {
  componentDidMount() {
    this.props.fetchUpsells(this.props.courseID);
  }

  render() {
    return (
      this.props.upsells.map((upsell: any) =>
        <UpsellCard key={upsell.id} {...upsell} />
      )
    );
  }
}

const mapStateToProps = (state: any) => ({
  upsells: state.upsells,
});

export default connect(mapStateToProps, { fetchUpsells })(UpsellList);