import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#273885',
    color: '#273885',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ChatList = ({ chat }) => {
  return (
    <List
      dense
      sx={{
        width: '100%',
        marginX: 'auto',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      {chat.map((value) => {
        return (
          <div key={value.createdChat._id}>
            <Divider variant='inset' component='li' />
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={`/chat/room=${value.createdChat._id}`}
                state={{ matchedUserName: value.userInfo.username }}
              >
                <ListItemAvatar>
                  <StyledBadge
                    overlap='circular'
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant={`${!value.createdChat.text.length ? 'dot' : ''}`}
                  >
                    <Avatar alt={`Avatar n°${1}`} src={value.userInfo.image} />
                  </StyledBadge>
                </ListItemAvatar>
                <ListItemText
                  primary={value.userInfo.username}
                  secondary={
                    value.createdChat.text.length > 0
                      ? value.createdChat.text[
                          value.createdChat.text.length - 1
                        ].msg
                      : 'Make a first move!'
                  }
                />
              </ListItemButton>
            </ListItem>
          </div>
        );
      })}
    </List>
  );
};

export default ChatList;
