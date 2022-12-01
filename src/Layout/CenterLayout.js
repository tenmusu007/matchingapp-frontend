import React from 'react';
import Box from '@mui/material/Box';
const CenterLayout = ({ children }) => {
  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 345,
        mx: 'auto',
        mt: '1rem',
      }}
    >
      {children}
    </Box>
  );
};

export default CenterLayout;
