import { FC, useState } from 'react';
import { isDifferenceLessTenPercent } from '../../utils/common';
import { Input, IconButton, TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import useCurrencyStore from '../../store/useCurrencyStore';
import { CurrencyData, CurrencyParams } from '../../types/currency';
import useViewport from '../../hooks/useViewport';

interface CurrencyTableCellProps {
  cellValue?: string;
  currency: CurrencyData;
  currencyParam: CurrencyParams;
}

const CurrencyTableCell: FC<CurrencyTableCellProps> = ({
  cellValue, 
  currency, 
  currencyParam 
}) => {
  const { isMobile } = useViewport();
  
  const [value, setValue] = useState(cellValue);
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(cellValue);
  const [isHovered, setIsHovered] = useState(false);

  const { data, setData } = useCurrencyStore();

  const handleSaveValue = () => {
    if (isDifferenceLessTenPercent(editingValue, cellValue)) {
      if (data) {
        const index = data?.findIndex(item => item.ccy === currency.ccy);
        if (index !== -1) {
          switch (currencyParam) {
            case CurrencyParams.buy:
              // @ts-ignore
              data[index].buy = editingValue;
              break;
            case CurrencyParams.sale:
              // @ts-ignore
              data[index].sale = editingValue;
              break;
            default:
              break;
          }
          setData(data);
        }
      }
      setValue(editingValue);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditingValue(value);
    setIsEditing(false);
  };

  return (
    <TableCell
      style={{ padding: '1rem', width: isMobile ? '50px' : '200px' }}
      onMouseEnter={() => {
        if (!isEditing)
        setIsHovered(true)
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ textAlign: 'center' }}>
        { !isEditing && (
          <>
            <span>{value}</span>
            { isHovered &&
              <IconButton onClick={() => setIsEditing(true)}>
                <EditIcon />
              </IconButton>
            }
          </>
        )}
        {isEditing && (
          <Input
            type="text"
            value={ editingValue }
            onChange={ (e) => setEditingValue(e.target.value) }
            endAdornment={
              <>
                <IconButton
                  onClick={ handleSaveValue }
                  disabled={ !isDifferenceLessTenPercent(editingValue, cellValue) }
                >
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={ handleCancel }>
                  <CancelIcon />
                </IconButton>
              </>
            }
          />
        )}
      </div>
    </TableCell>
  );
};

export default CurrencyTableCell;
