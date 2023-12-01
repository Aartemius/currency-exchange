import { FC, useState } from 'react';
import { isDifferenceLessTenPercent } from '../../utils/common';
import { 
  Input, 
  IconButton, 
  TableCell 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import useCurrencyStore from '../../store/useCurrencyStore';
import { CurrencyData, CurrencyParams } from '../../types/currency';
import useViewport from '../../hooks/useViewport';
import CheckIcon from '@mui/icons-material/Check';

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
      style={{
        padding: '1rem',
        width: isMobile ? '50px' : '220px'
      }}
      onMouseEnter={() => {
        if (!isEditing)
        setIsHovered(true)
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        textAlign: 'center',
        position: 'relative',
        width: '165px',
        margin: '0 auto'
        }}>
        { !isEditing && (
          <>
            <span>{value}</span>
            { isHovered &&
              <IconButton
                onClick={() => setIsEditing(true)}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  transform: 'translateY(-30%)',
                  width: '20px', 
                  height: '20px'
                }}
              >
                <EditIcon style={{ width: '15px', height: '15px' }} />
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
              <div
                style={{
                  position: 'absolute',
                  top: '-7px',
                  right: 0,
                  height: '20px',
                  display: 'flex'
                }}
              >
                <IconButton
                  onClick={ handleSaveValue }
                  disabled={ !isDifferenceLessTenPercent(editingValue, cellValue) }
                  style={{ height: '20px', width: '20px' }}
                >
                  <CheckIcon style={{ height: '15px', width: '15px' }} />
                </IconButton>
                <IconButton 
                  onClick={ handleCancel } 
                  style={{ height: '20px', width: '20px' }}
                >
                  <CancelIcon style={{ height: '15px', width: '15px' }} />
                </IconButton>
              </div>
            }
          />
        )}
      </div>
    </TableCell>
  );
};

export default CurrencyTableCell;
