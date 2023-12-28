import { useEffect } from 'react';
import useCurrencyStore from '../store/useCurrencyStore';
import useSWR, { mutate } from 'swr';
import Converter from './Converter';
import CurrencyTable from './table/CurrencyTable';
import { CircularProgress } from '@mui/material';
import ScreenError from './ScreenError';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AppContainer = () => {
  const { data: swrData, isLoading, error } = useSWR('data/data.json', fetcher);
  const { data: storeData, setData } = useCurrencyStore();
  const data = storeData ?? swrData;

  const handleFetch = async () => {
    await mutate('data/data.json');
    setData(swrData);
  };

  useEffect(() => {
    if (swrData) {
      handleFetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swrData])

  if (error) {
    console.error(error.message);
  }

  return (
    <div style={{ padding: '2rem' }}>
      { error && <ScreenError errorMessage="Oops! Something went wrong" /> }
      { isLoading && <CircularProgress color="inherit" /> }
      { data &&
        <>
          <CurrencyTable data={ data } />
          <Converter
            data={ [{
              ccy:"UAH",
              base_ccy:"UAH",
              buy:"1",
              sale:"1"
            }, ...data] }
          />
        </>
      }
    </div>
  );
}

export default AppContainer;