import React, { useState, useEffect } from 'react';
import MainLayout from '../Layout/MainLayout';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import BasicModal from '../components/BasicModal';
import axios from 'axios';
import { baseUrl } from '../helper/baseUrl';
const Profile = () => {
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      // const baseURL = 'http://localhost:8000';
      await axios
				.get(
					`${baseUrl}/getuserinfo`,
					{ id: "6373f48b2de13e26d98a89c7" },
					{ withCredentials: true }
				)
				.then((response) => {
					setUser(response.data);
					axios
						.post(
							`${baseUrl}/profileimage`,
							{ user_id: user?._id },
							{ withCredentials: true }
						)
						.then((res) => {
							if (res.data !== "nothing") {
								setImage(res.data);
							}
						});
				});
    };

    fetchData();
  }, [user?._id]);

  return (
    <>
      <MainLayout>
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
          <Avatar src={image} sx={{ m: 1, width: 56, height: 56 }} />
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
          </Box>
        </Box>
      </MainLayout>
    </>
  );
};

export default Profile;
