export enum enTransactionType {
  sale = 'For Sales',
  rent = 'For Rent',
  both = 'Sale/Rent'
}

export default interface IProperty {
  id: number;
  title: string;
  transactionType: enTransactionType;
  featured: boolean;
  description: string;
  salesPrice?: number;
  rentalPrice?: number;
  propertyAdministrationFee?: number;
  yearlyTax?: number;
  lotArea?: number;
  livingArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  suites?: number;
  garage?: number;
  images?: string[];
  propertyTypeId: number;

  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}