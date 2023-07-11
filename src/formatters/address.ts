export interface AddressFormatter {
  state?: string | null;
  city?: string | null;
  neighborhood?: string | null;
  street?: string | null;
  number?: number | null;
  complement?: string | null;
  zipcode?: string | null;
}

export function formatAddress(address?: AddressFormatter, fallback = 'Não informado'): string | null {
  if (!address) return fallback;

  const { state, city, neighborhood, street, number, complement, zipcode } = address;
  const result = `${street ?? ''}, ${`${number ?? ''} ${complement ?? ''}`.trim()} - ${neighborhood ?? ''}, ${
    city ?? ''
  } - ${state ?? ''}, ${zipcodeFormatter(zipcode)}`;

  if (!/\w/gim.test(result)) return fallback;
  return result;
}

function zipcodeFormatter(value?: string | null): string {
  if (!value) return '';
  return value.replace(/^(\d{0,5})(\d{0,3}).*/, '$1-$2').replace(/-$/, '');
}
