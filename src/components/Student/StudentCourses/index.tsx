// import React from 'react';
// import VisibleCourseCardGrid from 'components/Producer/Courses/VisibleCourseCardGrid';
// import CoursesSearch from 'components/CoursesSearch';

// import Slider from 'react-slick';

// function SamplePrevArrow(props) {
//   const { className, onClick } = props;
//   return (
//     <div className={className} onClick={onClick}>
//       <svg
//         id="Layer_1"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 37.6 66.1"
//       >
//         <path d="M34.2 3.2L3.5 33.4l30.7 30.7" />
//       </svg>
//     </div>
//   );
// }
// function SampleNextArrow(props) {
//   const { className, onClick } = props;
//   return (
//     <div className={className} onClick={onClick}>
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.6 66.1">
//         <path d="M3.5 3.2l30.7 30.2L3.5 64.1" />
//       </svg>
//     </div>
//   );
// }
// class SimpleSlider extends React.Component {
//   render() {
//     var settings = {
//       dots: false,
//       infinite: false,
//       speed: 500,
//       slidesToShow: 4,
//       adaptiveHeight: true,
//       slidesToScroll: 1,
//       prevArrow: <SamplePrevArrow />,
//       nextArrow: <SampleNextArrow />
//     };
//     return (
//       <Slider {...settings} className="featured-carousel">
//         <div className="featured-item">
//           <div className="content">
//             <h3 className="item-title">Curso de Photoshop</h3>
//             <p className="item-content">
//               Este Destaque é muito importante para testar o layout e ver se nao
//               quebra nenhuma tag dentro dos items do carousel
//             </p>
//             <a className="button outline">
//               <span>Acessar</span>
//             </a>
//           </div>
//           <img
//             alt=""
//             src="https://img.elo7.com.br/product/original/115E580/painel-paisagem-g-frete-gratis-decoracao-de-festa.jpg"
//           />
//         </div>
//         <div className="featured-item">
//           <div className="content">
//             <h3 className="item-title">Curso de Ilustracao</h3>
//             <p className="item-content">
//               Este Destaque é muito importante para testar o layout e ver se nao
//               quebra nenhuma tag dentro dos items do carousel
//             </p>
//             <a className="button outline">
//               <span>Acessar</span>
//             </a>
//           </div>
//           <img
//             alt=""
//             src="https://cdn.pixabay.com/photo/2014/07/27/13/49/tree-402953__340.jpg"
//           />
//         </div>

//         <div className="featured-item">
//           <div className="content">
//             <h3 className="item-title">Paisagens dahora paaaaakas</h3>
//             <p className="item-content">
//               Este Destaque é muito importante para testar o layout e ver se nao
//               quebra nenhuma tag dentro dos items do carousel
//             </p>
//             <a className="button outline">
//               <span>Acessar</span>
//             </a>
//           </div>
//           <img
//             alt=""
//             src="https://img.elo7.com.br/product/original/115E580/painel-paisagem-g-frete-gratis-decoracao-de-festa.jpg"
//           />
//         </div>

//         <div className="featured-item">
//           <div className="content">
//             <h3 className="item-title">Curso de Ilustracao</h3>
//             <p className="item-content">
//               Este Destaque é muito importante para testar o layout e ver se nao
//               quebra nenhuma tag dentro dos items do carousel
//             </p>
//             <a className="button outline">
//               <span>Acessar</span>
//             </a>
//           </div>
//           <img
//             alt=""
//             src="https://cdn.pixabay.com/photo/2014/07/27/13/49/tree-402953__340.jpg"
//           />
//         </div>

//         <div className="featured-item">
//           <div className="content">
//             <h3 className="item-title">Paisagens dahora paaaaakas</h3>
//             <p className="item-content">
//               Este Destaque é muito importante para testar o layout e ver se nao
//               quebra nenhuma tag dentro dos items do carousel
//             </p>
//             <a className="button outline">
//               <span>Acessar</span>
//             </a>
//           </div>
//           <img
//             alt=""
//             src="https://img.elo7.com.br/product/original/115E580/painel-paisagem-g-frete-gratis-decoracao-de-festa.jpg"
//           />
//         </div>

//         <div className="featured-item">
//           <div className="content">
//             <h3 className="item-title">Curso de Ilustracao</h3>
//             <p className="item-content">
//               Este Destaque é muito importante para testar o layout e ver se nao
//               quebra nenhuma tag dentro dos items do carousel
//             </p>
//             <a className="button outline">
//               <span>Acessar</span>
//             </a>
//           </div>
//           <img
//             alt=""
//             src="https://cdn.pixabay.com/photo/2014/07/27/13/49/tree-402953__340.jpg"
//           />
//         </div>

//         <div className="featured-item">
//           <div className="content">
//             <h3 className="item-title">Paisagens dahora paaaaakas</h3>
//             <p className="item-content">
//               Este Destaque é muito importante para testar o layout e ver se nao
//               quebra nenhuma tag dentro dos items do carousel
//             </p>
//             <a className="button outline">
//               <span>Acessar</span>
//             </a>
//           </div>
//           <img
//             alt=""
//             src="https://img.elo7.com.br/product/original/115E580/painel-paisagem-g-frete-gratis-decoracao-de-festa.jpg"
//           />
//         </div>
//       </Slider>
//     );
//   }
// }

// const StudentCourses = () => (
//   <section className="student-content">
//     <SimpleSlider />
//     <div className="container">
//       <div className="search-bar">
//         <CoursesSearch />
//       </div>
//       <VisibleCourseCardGrid />
//     </div>
//   </section>
// );

// export default StudentCourses;
