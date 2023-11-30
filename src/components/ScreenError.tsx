import { Alert } from "@mui/material";
import { FC } from "react";

interface RequestErrorProps {
  errorMessage: string;
}

const ScreenError: FC<RequestErrorProps> = ({errorMessage}) => (
  <div style={{ padding: '30vh 10%' }}>
    <Alert
      variant="filled"
      severity="error"
      style={{
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      { errorMessage }
    </Alert>
  </div>
);

export default ScreenError;