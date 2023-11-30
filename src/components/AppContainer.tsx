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
  
  let requestsCounter = (
    window.localStorage.getItem('requestsCounter') ? 
    Number(window.localStorage.getItem('requestsCounter')) : 0
  );

  const handleFetch = async () => {
    await mutate('data/data.json');
    requestsCounter++;
    window.localStorage.setItem('requestsCounter', JSON.stringify(requestsCounter));
    setData(swrData);
  };

  useEffect(() => {
    if (swrData) {
      handleFetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swrData])

  const isRequestError = requestsCounter % 5 === 0;

  if (error) {
    console.error(error.message);
  }

  return (
    <div style={{ padding: '2rem' }}>
      { isRequestError && <ScreenError errorMessage="Error occured (5th request)" /> }
      { error && <ScreenError errorMessage="Oops! Something went wrong" /> }
      { isLoading && <CircularProgress color="inherit" /> }
      { !isRequestError && data &&
        <>
          <CurrencyTable data={ data } />
          <Converter data={ data } />
        </>
      }
    </div>
  );
}

export default AppContainer;