export interface FilterValues {
  type_date: number;
  period: [Date, Date];
  producer_type: number;
  producer_value: string;
  products: string;
  invoice: string;
  status_invoice: number[];
}

export interface SalesListItem {
  id: number;
  created_at: Date;
  invoice: number;
  client: string;
  product: string;
  affiliate: string;
  utm: string;
  gain: number;
}
