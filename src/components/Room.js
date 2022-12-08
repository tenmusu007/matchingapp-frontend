import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';

const LoggedInDiv = styled('div')({
  display: 'inline-block',
  wordBreak: 'break-word',
  fontSize: '14px',
  padding: '0.3rem 0.7rem',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  borderBottomLeftRadius: 15,
  backgroundColor: '#273885',
  color: 'white',
});

const MatchedUserDiv = styled('div')({
  display: 'inline-block',
  wordBreak: 'break-word',
  fontSize: '14px',
  padding: '0.3rem 0.7rem',
  borderTopRightRadius: 15,
  borderTopLeftRadius: 15,
  borderBottomRightRadius: 15,
  backgroundColor: '#F5F5F5',
});

const Room = ({ messageList, loggedInUser, image }) => {
  return (
    <Box>
      {messageList.map((message, index) => {
        return (
          <Grid container spacing={2} key={index}>
            <Grid item xs={2}>
              {message.username !== loggedInUser.username && (
                <Avatar alt={`Avatar n°${1}`} src={image} />
              )}
            </Grid>
            <Grid item xs={10}>
              {message.username !== loggedInUser.username ? (
                <MatchedUserDiv key={index}>
                  <pre>
                    <Typography align={'left'}>{message.msg}</Typography>
                  </pre>
                </MatchedUserDiv>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <LoggedInDiv key={index}>
                    <pre>
                      <Typography align={'left'}>{message.msg}</Typography>
                    </pre>
                  </LoggedInDiv>
                </Box>
              )}
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
};

export default Room;
