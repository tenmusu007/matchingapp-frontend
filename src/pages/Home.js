import React, { useState, useEffect } from 'react';
import MainLayout from '../Layout/MainLayout';
import axios from 'axios';
import TinderCardCom from '../components/TinderCardCom';
import Spinner from '../components/Spinner';
import { SnackbarProvider } from 'notistack';

const Home = () => {
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    const fetchMatchableUsers = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/like/user`,
        { withCredentials: true }
      );
      setUsersData(res.data);
    };
    fetchMatchableUsers();
  }, []);

  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '& .SnackbarContent-root': {
            bgcolor: 'accent.main',
          },
        }}
      >
        <MainLayout>
          {usersData ? <TinderCardCom usersData={usersData} /> : <Spinner />}
        </MainLayout>
      </SnackbarProvider>
    </>
  );
};

export default Home;
