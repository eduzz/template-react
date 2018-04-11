import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Icon from 'material-ui/Icon';
import { connect } from 'react-redux';
import { fetchRating, sendRating } from 'actionCreators/rating';

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
  constructor(props: IProps) {
    super(props);

    this.state = {
      rating: {},
    };
  }

  componentDidMount() {
    this.props.fetchRating(this.props.lessonID).then(
      (res: any) => this.setState({
        rating: res.data,
      })
    );
  }

  handleChange = (rate: number) => {
    const rating = {
      avg: this.state.rating.avg,
      user_rating: rate === this.state.rating.user_rating ? 0 : rate,
    };

    this.setState({
      rating,
    });
    this.props.sendRating(this.props.lessonID, { rating: rate });
  }

  render() {
    const ratingValues = [1, 2, 3, 4, 5];

    const color = this.state.rating.user_rating ? '#FFEB3B' : '#03A9F4';

    const rating = this.state.rating.user_rating || this.state.rating.avg || 0;

    return (
      <div className='rating'>
        {ratingValues.map(rate =>
          <Checkbox
            key={rate}
            style={{ color }}
            icon={<Icon>star_border</Icon>}
            checkedIcon={<Icon>star</Icon>}
            checked={rating >= rate}
            disabled={this.state.rating.user_rating}
            onClick={() => this.handleChange(rate)}
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