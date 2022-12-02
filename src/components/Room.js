import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@mui/material/Avatar';

const Room = ({ messageList, loggedInUser, image }) => {
  return (
    <Box>
      {messageList.map((message, index) => {
        return (
          <Grid container spacing={2} key={index}>
            {message.username === loggedInUser.username ? (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Box
                    sx={{
                      wordBreak: 'break-word',
                      fontSize: '14px',
                      padding: '0.5rem',
                      borderTopLeftRadius: 50,
                      borderTopRightRadius: 50,
                      borderBottomLeftRadius: 50,
                      backgroundColor: '#273885',
                      color: 'white',
                    }}
                  >
                    <Typography align={'right'}>{message.msg}</Typography>
                  </Box>
                </Box>
              </Grid>
            ) : (
              <>
                <Grid item xs={2}>
                  {message.username !== loggedInUser.username && (
                    <Avatar alt={`Avatar n°${1}`} src={image} />
                  )}
                </Grid>
                <Grid item xs={10}>
                  <Box
                    key={index}
                    sx={{
                      display: 'inline-block',
                      wordBreak: 'break-word',
                      fontSize: '14px',
                      padding: '0.5rem',
                      borderTopRightRadius: 50,
                      borderTopLeftRadius: 50,
                      borderBottomRightRadius: 50,
                      backgroundColor: '#F5F5F5',
                    }}
                  >
                    <Typography align={'left'}>{message.msg}</Typography>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        );
      })}
    </Box>
  );
};

export default Room;
