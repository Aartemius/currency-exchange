export enum CurrencyParams {
  base_ccy = 'base_ccy',
  ccy = 'ccy',
  buy = 'buy',
  sale = 'sell'
}
export interface CurrencyData {
  base_ccy: string;
  ccy: string;
  buy: string;
  sale: string;
}