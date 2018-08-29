import logoImage from './assets/images/logo.png';

console.log(' %c      ', `
  display: block;
  font-size: 60px;
  line-height: 60px;
  text-align: center;
  background: url(${logoImage}) no-repeat;
  background-size: 170px 50px;
`);
console.log(`v3.${process.env.REACT_APP_BUILD_NUMBER}  ${process.env.REACT_APP_BUILD_DATE}`);