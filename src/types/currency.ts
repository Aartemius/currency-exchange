export enum CurrencyParams {
  base_ccy = 'base_ccy',
  ccy = 'ccy',
  buy = 'buy',
  sale = 'sell'
}
export interface CurrencyData {
  base_ccy: CurrencyParams.base_ccy;
  ccy: CurrencyParams.ccy;
  buy: CurrencyParams.buy;
  sale: CurrencyParams.sale;
}