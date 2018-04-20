import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { fetchHighlights, cleanHighlights } from 'actionCreators/highlights';
import { Link } from 'react-router-dom';
import { cdn } from 'constants/index';
import Grid from 'material-ui/Grid';

const styles = require('./styles.css');

function SamplePrevArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <svg
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 37.6 66.1'
      >
        <path d='M34.2 3.2L3.5 33.4l30.7 30.7' />
      </svg>
    </div>
  );
}

function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 37.6 66.1'>
        <path d='M3.5 3.2l30.7 30.2L3.5 64.1' />
      </svg>
    </div>
  );
}

interface IProps {
  highlights: any;
  fetchHighlights: any;
  cleanHighlights: any;
}

class Carousel extends Component<IProps> {
  componentDidMount() {
    this.props.fetchHighlights();
  }

  componentWillUnmount() {
    this.props.cleanHighlights();
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: this.props.highlights.length < 4 ? this.props.highlights.length : 4,
      adaptiveHeight: true,
      slidesToScroll: 1,
      prevArrow: <SamplePrevArrow />,
      nextArrow: <SampleNextArrow />
    };

    if (this.props.highlights.length) {
      return (
        <div className={styles.component}>
          <Slider {...settings} className='featured-carousel'>
            {this.props.highlights.map((highlight: any) =>
              <div key={highlight.id} className='featured-item'>
                <div className='content'>
                  <h3 className='item-title'>{highlight.title}</h3>
                  <p className='item-content'>{highlight.description}</p>
                  <Link to={`courses/${highlight.id}`} className='button outline'>
                    <span>Acessar</span>
                  </Link>
                </div>
                <img alt='' src={highlight.customizations && cdn + highlight.customizations.avatar} />
              </div>
            )}
          </Slider>
        </div>
      );
    }

    return (
      <div className={styles.component}>
        <Grid container className='loading' justify='center' spacing={0}>
          <Grid item xs={4} className='loading-block'>
            <div className='loading-effect'></div>
          </Grid>
          <Grid item xs={4} className='loading-block'>
            <div className='loading-effect'></div>
          </Grid>
          <Grid item xs={4} className='loading-block'>
            <div className='loading-effect'></div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  highlights: state.highlights,
});

export default connect(mapStateToProps, { fetchHighlights, cleanHighlights })(Carousel);