import { BUILD_DATE, BUILD_NUMBER } from 'settings';

import logoImage from './assets/images/logo.png';

console.log(' %c      ', `
  display: block;
  font-size: 60px;
  line-height: 60px;
  text-align: center;
  background: url(${logoImage}) no-repeat;
  background-size: 170px 50px;
`);
console.log(`v3.${BUILD_NUMBER}  ${BUILD_DATE}`);