import React, { useState, useEffect, useContext } from 'react';
import MainLayout from '../Layout/MainLayout';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import BasicModal from '../components/BasicModal';
import axios from 'axios';
import Link from '@mui/material/Link';
import { AuthContext } from '../state/AuthContext';
import { logoutCall } from '../state/dispatch';

const Profile = () => {
  const { dispatch } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const getUserInfo = `${process.env.REACT_APP_SERVER_URL}/auth/getuserinfo`;
      const res = await axios.get(getUserInfo, {
        withCredentials: true,
      });

      setUser(res.data);
    };

    fetchLoggedInUser();
  }, []);

  return (
    <>
      <MainLayout>
        {user && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 345,
              mx: 'auto',
              py: '1.3rem',
            }}
          >
            <Avatar src={user.image} sx={{ m: 1, width: 56, height: 56 }} />
            <Typography variant='h1'>{user?.username}</Typography>
            <Box>
              <Grid>
                <IconButton
                  aria-label='edit'
                  color={'primary'}
                  size='large'
                  onClick={handleClickOpen}
                >
                  <EditIcon />
                </IconButton>
              </Grid>
              <Grid>
                <BasicModal
                  open={open}
                  setOpen={setOpen}
                  user={user}
                  setUser={setUser}
                />
              </Grid>
              <Grid>
                <Link
                  href='/login'
                  onClick={() => {
                    console.log('logout');
                    logoutCall(dispatch);
                  }}
                >
                  Logout
                </Link>
              </Grid>
            </Box>
          </Box>
        )}
      </MainLayout>
    </>
  );
};

export default Profile;
