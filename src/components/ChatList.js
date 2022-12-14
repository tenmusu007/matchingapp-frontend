import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CenterLayout from '../Layout/CenterLayout';
import Typography from '@mui/material/Typography';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: `${theme.palette.secondary.light}`,
    color: `${theme.palette.secondary.light}`,
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

const ChatList = ({ chat, deleteChat }) => {
  return (
    <>
      {chat.length === 0 ? (
        <CenterLayout>
          <img
            src={process.env.PUBLIC_URL + '/images/notification/Message.svg'}
            alt={'Not matched yet'}
            width={300}
          />
          <Typography variant='h1'>Not matched yet!</Typography>
        </CenterLayout>
      ) : (
        <List
          dense
          sx={{
            width: '100%',
            marginX: 'auto',
            maxWidth: 360,
            bgcolor: 'background.paper',
          }}
        >
          {chat.map((value, index) => {
            return (
              <div key={value.createdChat._id}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to={`/chat/room=${value.createdChat._id}`}
                    state={{ matchedUserName: value.userInfo.username }}
                  >
                    <ListItemAvatar>
                      <StyledBadge
                        overlap='circular'
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant={`${
                          !value.createdChat.text.length ? 'dot' : ''
                        }`}
                      >
                        <Avatar
                          alt={`Avatar n??${1}`}
                          src={value.userInfo.image}
                        />
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
                  <Button color='secondary' onClick={() => deleteChat(index)}>
                    <CloseIcon />
                  </Button>
                </ListItem>
              </div>
            );
          })}
        </List>
      )}
    </>
  );
};

export default ChatList;
