import IAddress from 'interfaces/models/address';
import { ZIPCODE_WEBMANIA } from 'settings';

import { ZipcodeProvider } from './abstract';

export interface IResult {
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}

export default new ZipcodeProvider(
  'webmania',
  (zipcode) => `https://webmaniabr.com/api/1/cep/${zipcode}/?app_key=${ZIPCODE_WEBMANIA.key}&app_secret=${ZIPCODE_WEBMANIA.secret}`,
  (result: IResult) => ({
    state: result.uf,
    city: result.cidade,
    neighborhood: result.bairro,
    street: result.endereco,
    zipcode: result.cep.replace(/\D/gi, ''),
  } as IAddress)
);