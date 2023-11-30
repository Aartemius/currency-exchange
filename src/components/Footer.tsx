import { Typography } from "@mui/material";

const Footer = () => (
  <footer
    style={{
      padding: '1rem',
      borderTop: '1px solid #000',
      background: '#f2f2f2',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >    
    <img
      src="images/logo.png"
      alt="currency exchange"
      style={{
        height: '1.75rem',
        marginRight: '.75rem'
      }}
    />
    <Typography
      variant="h6"
      component="p"
      align="center"
    >
      { new Date().getFullYear() } all rights reserved
    </Typography>
  </footer>
);

export default Footer;