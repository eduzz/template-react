import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Icon from 'material-ui/Icon';
import { connect } from 'react-redux';
import { fetchRating, sendRating } from 'actionCreators/rating';

const styles = require('./styles.css');

interface IProps {
  lessonID: any;
  rating: any;
  sendRating: any;
  fetchRating: any;
}

interface IState {
  rating: any;
}

class Rating extends Component<IProps, IState> {
  componentDidMount() {
    this.props.fetchRating(this.props.lessonID);
  }

  handleChange = (rate: number) => {
    const rating = {
      avg: this.props.rating.avg,
      user_rating: rate === this.props.rating.user_rating ? 0 : rate,
    };

    this.props.sendRating(this.props.lessonID, rating);
  }

  render() {
    const ratingValues = [1, 2, 3, 4, 5];

    const color = this.props.rating.user_rating ? '#FFEB3B' : '#03A9F4';

    const rating = this.props.rating.user_rating || this.props.rating.avg || 0;

    if (this.props.rating.avg) {
      return (
        <div className='rating'>
          {ratingValues.map(rate =>
            <Checkbox
              key={rate}
              style={{ color }}
              icon={<Icon>star_border</Icon>}
              checkedIcon={<Icon>star</Icon>}
              checked={rating >= rate}
              disabled={this.props.rating.user_rating}
              onClick={() => this.handleChange(rate)}
            />
          )}
        </div>
      );
    }

    return (
      <div className={styles.loading}>
        {ratingValues.map(rate =>
          <Checkbox
            className='star'
            key={rate}
            checkedIcon={<Icon>star</Icon>}
            checked={true}
            disabled={true}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  rating: state.rating,
});

export default connect(mapStateToProps, { fetchRating, sendRating })(Rating);