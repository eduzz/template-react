export default interface IAddress {
  id?: number;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number?: number;
  complement?: string;
  zipcode: string;
  latitude?: number;
  longitude?: number;
  usedBy?: string;

  zoneId?: number;

  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}