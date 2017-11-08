import React from 'react';
import VisibleCourseCardGrid from '../containers/VisibleCourseCardGrid';
import CoursesSearch from '../containers/CoursesSearch';
import CoursesFilters from './CoursesFilters';


import Slider  from 'react-slick';

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      adaptiveHeight: true,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings} className="featured-carousel">
        <div className="featured-item">
        	<div className="content">
        		<h3 className="item-title">Curso de Photoshop</h3>
        		<p className="item-content">Este Destaque é muito importante para testar o layout e ver se nao quebra nenhuma tag dentro dos items do carousel</p>
        		<a href="#" className="button outline">Acessar</a>
        	</div>
        	<img src="https://img.elo7.com.br/product/original/115E580/painel-paisagem-g-frete-gratis-decoracao-de-festa.jpg"/>
        </div>
        <div className="featured-item">
	        <div className="content">
	        		<h3 className="item-title">Curso de Ilustracao</h3>
	        		<p className="item-content">Este Destaque é muito importante para testar o layout e ver se nao quebra nenhuma tag dentro dos items do carousel</p>
	        		<a href="#" className="button outline">Acessar</a>
	        	</div>
	        <img src="https://cdn.pixabay.com/photo/2014/07/27/13/49/tree-402953__340.jpg"/>
        </div>
        <div className="featured-item">
        	<div className="content">
        		<h3 className="item-title">Paisagens dahora paaaaakas</h3>
        		<p className="item-content">Este Destaque é muito importante para testar o layout e ver se nao quebra nenhuma tag dentro dos items do carousel</p>
        		<a href="#" className="button outline">Acessar</a>
        	</div>
        	<img src="https://img.elo7.com.br/product/original/115E580/painel-paisagem-g-frete-gratis-decoracao-de-festa.jpg"/>
        </div>
        <div className="featured-item"><img src="https://cdn.pixabay.com/photo/2017/03/26/12/13/countryside-2175353__340.jpg"/></div>
        <div className="featured-item"><img src="https://blog.emania.com.br/content/uploads/2015/12/Papel-de-Parede-de-Paisagem.jpg"/></div>
        <div className="featured-item"><img src="https://coffeewiththelord.files.wordpress.com/2015/05/spring-mountain-scene.jpg"/></div>
      </Slider>
    );
  }
}

const StudentCourses = () => (
    <section className="student-content">
        <SimpleSlider />
        <div className="container">
        	<div className="search-bar">
	            <CoursesSearch />
	            <CoursesFilters />
        	</div>
            <VisibleCourseCardGrid />
        </div>
    </section>
);

export default StudentCourses;