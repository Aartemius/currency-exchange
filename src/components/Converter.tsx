import { 
  FC, 
  memo, 
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

interface ConverterProps {
  data: CurrencyData[];
}

const Converter: FC<ConverterProps> = memo(({data}) => {
  const { isMobile } = useViewport();

  const exchangeRef = useRef({
    sellingCurrency: data[0].ccy as string,
    buyingCurrency: data[1].ccy as string,
    sellingAmount: 100
  });

  const [buyValue, setBuyValue] = useState('');

  const handleConvert = () => {
    const currencyToSell = data?.find(item => item.ccy === exchangeRef.current.sellingCurrency);
    const currencyToBuy = data?.find(item => item.ccy === exchangeRef.current.buyingCurrency);
    const convertedAmount = Number(currencyToBuy?.buy) / Number(currencyToSell?.sale) * exchangeRef.current.sellingAmount;

    setBuyValue(convertedAmount.toFixed(2));
  };

  const handleSellingCurrencyChange = (event: SelectChangeEvent<string>) => {
    exchangeRef.current = {
      ...exchangeRef.current,
      sellingCurrency: event.target.value
    };
    handleConvert();
  }

  const handleBuyingCurrencyChange = (event: SelectChangeEvent<string>) => {
    exchangeRef.current = {
      ...exchangeRef.current,
      buyingCurrency: event.target.value
    };
    handleConvert();
  }

  const handleSellingAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    exchangeRef.current = {
      ...exchangeRef.current,
      sellingAmount: Number(event.target.value)
    };
    handleConvert();
  }

  const swapCurrencies = () => {
    const sell = exchangeRef.current.sellingCurrency;
    const buy = exchangeRef.current.buyingCurrency;
    exchangeRef.current = {
      ...exchangeRef.current,
      sellingAmount: Number(buyValue)
    };

    exchangeRef.current = {
      ...exchangeRef.current,
      buyingCurrency: sell,
      sellingCurrency: buy,
    };

    handleConvert();
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
          value={ exchangeRef.current.sellingAmount.toFixed(2) }
          style={{ marginRight: '1rem' }}
        />
        <Select
          value={ exchangeRef.current.sellingCurrency }
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
          value={ exchangeRef.current.buyingCurrency }
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
});

export default Converter;
