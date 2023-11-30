import { Typography } from "@mui/material";

const Header = () => (
  <header
    style={{
      padding: '1rem 3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #000',
      background: '#f2f2f2'
    }}
  >
    <img
      src="images/logo.png"
      alt="currency exchange"
      style={{ height: '2.25rem' }}
    />
    <Typography variant="h5" component="h1">
      Currency exchange
    </Typography>
  </header>
);

export default Header;