import IAddress from 'interfaces/models/address';
import ISelectItem from 'interfaces/selectItem';
import * as Rx from 'rxjs';

import states from './states';
import zipcodeProviders from './zipcodeProviders';

export class AddressService {
  getAddressByZipcode(zipcode: string): Rx.Observable<IAddress> {
    return Rx.from(zipcodeProviders.getResult(zipcode));
  }

  getStates(): Rx.Observable<ISelectItem<string>[]> {
    return Rx.of(states);
  }
}

const addressService = new AddressService();
export default addressService;