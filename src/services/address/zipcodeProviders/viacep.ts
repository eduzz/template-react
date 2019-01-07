import IAddress from 'interfaces/models/address';

import { ZipcodeProvider } from './abstract';

export interface IResult {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
}

export default new ZipcodeProvider(
  'viacep',
  (zipcode) => `https://viacep.com.br/ws/${zipcode}/json`,
  (result: IResult) => ({
    state: result.uf,
    city: result.localidade,
    neighborhood: result.bairro,
    street: result.logradouro,
    zipcode: result.cep.replace(/\D/gi, ''),
  } as IAddress)
);