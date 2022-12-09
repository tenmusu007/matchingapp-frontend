import React, { useState, useEffect, useContext } from 'react';
import MainLayout from '../Layout/MainLayout';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import BasicModal from '../components/BasicModal';
import axios from 'axios';
import { AuthContext } from '../state/AuthContext';
import { logoutCall } from '../state/dispatch';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { SnackbarProvider } from 'notistack';

const Profile = () => {
  const { dispatch } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
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
  }, [open]);

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
          {user ? (
            <Grid
              container
              rowSpacing={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 345,
                mx: 'auto',
                my: '1.3rem',
              }}
            >
              <Grid item xs={12}>
                <Avatar src={user.image} sx={{ m: 1, width: 56, height: 56 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h1'>{user?.username}</Typography>
              </Grid>
              <Grid item xs={12}>
                <IconButton
                  aria-label='edit'
                  color={'primary'}
                  size='large'
                  onClick={handleClickOpen}
                >
                  <EditIcon />
                </IconButton>
                <BasicModal
                  open={open}
                  setOpen={setOpen}
                  user={user}
                  setUser={setUser}
                />
              </Grid>
              <Grid item xs={12}>
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
            </Grid>
          ) : (
            <Spinner />
          )}
        </MainLayout>
      </SnackbarProvider>
    </>
  );
};

export default Profile;
