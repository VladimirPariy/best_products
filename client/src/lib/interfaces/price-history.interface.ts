export interface IPriceHistory {
  created_at: string;
  price_at_timestamp: string;
  price_history_id: number;
  product: number;
  updated_at: string;
}

export interface IShotPriceHistory extends Omit<IPriceHistory, "product"> {}
