import axios from 'axios';
import ServiceError from 'errors/serviceError';
import IAddress from 'interfaces/models/address';

export class ZipcodeProvider {
  providers: ZipcodeProvider[];

  constructor(
    private name: string,
    private getUrl: (zipcode: string) => string,
    private mapper: (result: any) => IAddress
  ) {
    this.providers = [this];
  }

  public async getResult(zipcode: string): Promise<IAddress> {
    let completed = 0;

    const { provider, address } = await Promise.race(this.providers.map(async provider => {
      try {
        const address = await provider.fetchResult(zipcode);

        if (!address || !address.street) {
          throw new Error();
        }

        return { provider, address };
      } catch (err) {
        completed++;

        if (completed === this.providers.length) {
          throw new ServiceError('zipcode-not-found', { zipcode }, false);
        }

        //infinite
        return new Promise<{ provider: ZipcodeProvider, address: IAddress }>(() => null);
      }
    }));

    console.log(`WIN: ${provider.name}`);
    return address;
  }

  private async fetchResult(zipcode: string): Promise<IAddress> {
    const { data } = await axios.get(this.getUrl(zipcode));
    return this.mapper(data);
  }

  public addProviders(...providers: ZipcodeProvider[]): ZipcodeProvider {
    this.providers = [...this.providers, ...providers];
    return this;
  }
}