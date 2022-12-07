import React from 'react';
import Container from '@mui/material/Container';

const ChatroomLayout = ({ children }) => {
  return (
    <>
      <Container
        maxWidth='sm'
        sx={{ height: 'auto', marginTop: 15, marginBottom: 10 }}
      >
        {children}
      </Container>
    </>
  );
};

export default ChatroomLayout;
