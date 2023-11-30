import { create } from 'zustand';
import { CurrencyData } from '../types/currency';

interface CurrencyStore {
  data: CurrencyData[] | null;
  setData: (newData: CurrencyData[]) => void;
}

const useCurrencyStore = create<CurrencyStore>((set) => ({
  data: null,
  setData: newData => set({ data: newData })
}));

export default useCurrencyStore;
