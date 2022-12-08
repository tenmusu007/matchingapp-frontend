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
import { AuthContext } from '../state/AuthContext';
import { logoutCall } from '../state/dispatch';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Profile = () => {
  const { dispatch } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchLoggedInUser = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/auth/getuserinfo`,
          {
            withCredentials: true,
          }
        );

        setUser(res.data);
      };
      fetchLoggedInUser();
    }, 800);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <>
      <MainLayout>
        {user ? (
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
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
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
                <Button
                  variant='contained'
                  color='secondary'
                  sx={{
                    textTransform: 'none',
                  }}
                  onClick={() => {
                    logoutCall(dispatch);
                    navigate('/login');
                  }}
                >
                  Logout
                </Button>
              </Grid>
            </Box>
          </Box>
        ) : (
          <Spinner />
        )}
      </MainLayout>
    </>
  );
};

export default Profile;
