import IAddress from './address';

export default interface ICompany {
  id: number;
  name: string;
  email?: string;
  website: string;
  logo: string | { filename: string, base64: string };
  phone: string;

  addressId?: number;
  address?: IAddress;

  createdDate?: Date;
  updatedDate?: Date;
}