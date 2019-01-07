import viacep from './viacep';
import webmania from './webmania';
import widenet from './widenet';

export default widenet.addProviders(
  webmania,
  viacep
);