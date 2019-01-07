import IAddress from 'interfaces/models/address';

import { ZipcodeProvider } from './abstract';

interface IResult {
  status: number;
  code: string;
  state: string;
  city: string;
  district: string;
  address: string;
}

export default new ZipcodeProvider(
  'widenet',
  (zipcode) => `http://apps.widenet.com.br/busca-cep/api/cep/${zipcode}.json`,
  (result: IResult) => ({
    state: result.state,
    city: result.city,
    neighborhood: result.district,
    street: result.address,
    zipcode: result.code.replace(/\D/gi, ''),
  } as IAddress)
);