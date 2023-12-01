import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CurrencyTableCell from './CurrencyTableCell';
import { FC } from 'react';
import { CurrencyData, CurrencyParams } from '../../types/currency';
import useViewport from '../../hooks/useViewport';

interface CurrencyTableProps {
  data: CurrencyData[];
}

const CurrencyTable: FC<CurrencyTableProps> = ({ data }) => {
  const { isMobile } = useViewport();
  
  return (
  <TableContainer component={ Paper } style={{ marginBottom: '2rem' }}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow style={{ maxWidth: isMobile ? '90vw' : undefined }}>
          <TableCell style={{ width: isMobile ? '60px' : undefined }}>
            Currency
          </TableCell>
          <TableCell
            align="center"
            style={{ width: isMobile ? '50px' : '165px' }}
          >
            Buy
          </TableCell>
          <TableCell
            align="center"
            style={{ width: isMobile ? '50px' : '165px' }}
          >
            Sell
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((row, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            style={{ maxWidth: isMobile ? '90vw' : undefined }}
          >
            <TableCell
              component="th"
              scope="row"
              style={{ width: isMobile ? '60px' : undefined }}
            >
              { row.ccy } / { row.base_ccy }
            </TableCell>
            <CurrencyTableCell 
              currency={ row } 
              cellValue={ row.buy } 
              currencyParam={ CurrencyParams.buy }
            />
            <CurrencyTableCell 
              currency={ row } 
              cellValue={ row.sale } 
              currencyParam={ CurrencyParams.sale } 
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)};

export default CurrencyTable;