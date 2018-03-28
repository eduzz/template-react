import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { fetchHighlights } from 'actionCreators/highlights';
import { Link } from 'react-router-dom';
import { cdn } from 'constants/index';

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
}

interface IState {
  settings: any;
}

class Carousel extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        adaptiveHeight: true,
        slidesToScroll: 1,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />
      }
    };
  }

  componentDidMount() {
    this.props.fetchHighlights();
  }

  render() {
    return (
      <Slider {...this.state.settings} className='featured-carousel'>
        {this.props.highlights.map((highlight: any) =>
          <div key={highlight.id} className='featured-item'>
            <div className='content'>
              <h3 className='item-title'>{highlight.title}</h3>
              <p className='item-content'>Mussum Ipsum, cacilds vidis litro abertis. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet.</p>
              <Link to={`courses/${highlight.id}`} className='button outline'>
                <span>Acessar</span>
              </Link>
            </div>
            <img alt='' src={highlight.customizations && cdn + highlight.customizations.avatar} />
          </div>
        )}
      </Slider>
    );
  }
}

const mapStateToProps = (state: any) => ({
  highlights: state.courses,
});

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({ fetchHighlights }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);