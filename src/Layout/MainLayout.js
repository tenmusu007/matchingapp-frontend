import React from 'react';
import Container from '@mui/material/Container';

const Layout = ({ children }) => {
  return (
    <>
      <Container maxWidth='sm' sx={{ height: '80vh' }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
