import { 
  FC, 
  useEffect, 
  useRef, 
  useState 
} from "react";
import { 
  Select, 
  MenuItem, 
  TextField, 
  SelectChangeEvent, 
  IconButton
} from "@mui/material";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { CurrencyData } from "../types/currency";
import useViewport from "../hooks/useViewport";
import useCurrencyStore from "../store/useCurrencyStore";

interface ConverterProps {
  data: CurrencyData[];
}

const Converter: FC<ConverterProps> = ({data}) => {
  const { isMobile } = useViewport();

  const sellingCurrencyRef = useRef(data[0].ccy as string);
  const buyingCurrencyRef = useRef(data[1].ccy as string);
  const sellingAmountRef = useRef(100);

  const [buyValue, setBuyValue] = useState('');

  const convertCurrencies = () => {
    const currencyToSell = data?.find(item => item.ccy === sellingCurrencyRef.current);
    const currencyToBuy = data?.find(item => item.ccy === buyingCurrencyRef.current);
    const convertedAmount = Number(currencyToSell?.sale) / Number(currencyToBuy?.buy) * sellingAmountRef.current;

    setBuyValue(convertedAmount.toFixed(2));
  };

  useEffect(() => {
    convertCurrencies();
    const unsubscribe = useCurrencyStore.subscribe(convertCurrencies);

    return unsubscribe;
  });

  const handleSellingCurrencyChange = (event: SelectChangeEvent<string>) => {
    sellingCurrencyRef.current = event.target.value;
    convertCurrencies();
  }

  const handleBuyingCurrencyChange = (event: SelectChangeEvent<string>) => {
    buyingCurrencyRef.current = event.target.value;
    convertCurrencies();
  }

  const handleSellingAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    sellingAmountRef.current = Number(event.target.value);
    convertCurrencies();
  }

  const swapCurrencies = () => {
    const sell = sellingCurrencyRef.current;
    const buy = buyingCurrencyRef.current;
    sellingAmountRef.current = Number(buyValue);
    sellingCurrencyRef.current = buy;
    buyingCurrencyRef.current = sell;

    convertCurrencies();
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: isMobile ? 'wrap' : 'nowrap'
      }}
    >
      <div style={{
        width: isMobile ? '100%' : '40%',
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'flex-end'
      }}>
        <TextField
          label="Change"
          type="number"
          onChange={ handleSellingAmountChange } 
          value={ sellingAmountRef.current.toFixed(2) }
          style={{ marginRight: '1rem' }}
        />
        <Select
          value={ sellingCurrencyRef.current }
          onChange={ handleSellingCurrencyChange }
        >
          { data?.map(item => (
            <MenuItem key={ item.ccy } value={ item.ccy }>
              { item.ccy }
            </MenuItem>
          ))}
        </Select>
      </div>

      <IconButton
        onClick={ swapCurrencies }
        style={{ margin: isMobile ? '1rem 0' : '0 1rem' }}
      >
        <SyncAltIcon />
      </IconButton>

      <div style={{
        width: isMobile ? '100%' : '40%',
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'flex-start'
      }}>
        <TextField
          label="Get"
          type="number"
          value={ buyValue }
          style={{ marginRight: '1rem' }}
        />
        <Select
          value={ buyingCurrencyRef.current }
          onChange={ handleBuyingCurrencyChange }
        >
          { data?.map(item => (
            <MenuItem key={ item.ccy } value={ item.ccy }>
              { item.ccy }
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Converter;
