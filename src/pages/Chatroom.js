import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import ChatroomLayout from '../Layout/ChatroomLayout';
import { Container } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Room from '../components/Room';
import Spinner from '../components/Spinner';
const socket = io(process.env.REACT_APP_SERVER_URL);

const Chatroom = () => {
  const roomParam = useParams();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [messageList, setMessageList] = useState(null);
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  // const [roomParam, setRoom] = useState('');
  const messageRef = useRef(null);
  const location = useLocation();
  const { matchedUserName } = location.state;

  useEffect(() => {
    const fetchChatHistory = async () => {
      const loggedInUser = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/getuserinfo`,
        {
          withCredentials: true,
        }
      );

      if (roomParam.id) {
        // setRoom(roomParam.id);
        socket.emit('join_room', roomParam.id);
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/chat/getchat`,
          {
            room_id: roomParam.id,
          }
        );

        setLoggedInUser(loggedInUser.data);
        setMessageList(res.data.text);
        setImage(res.data.image);
      }
      // if (roomParam.id !== undefined || null) {
      //   // setRoom(roomParam.id);
      //   socket.emit('join_room', roomParam.id);
      //   axios
      //     .post(`${process.env.REACT_APP_SERVER_URL}/chat/getchat`, {
      //       room_id: roomParam.id,
      //     })
      //     .then((res) => {
      //       setMessageList(res.data.text);
      //       setImage(res.data.image);
      //     });
      // }
    };
    fetchChatHistory();

    socket.on('recived_msg', (data) => {
      setMessageList((prev) => [...prev, data]);
    });
    socket.on('joined_room', (roomId, user) => {
      // setRoom(roomId);
    });
  }, [roomParam]);

  console.log('sss');

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit('send_msg', {
      data: {
        msg: messageRef.current.value,
        username: loggedInUser.username,
        user_id: loggedInUser.user_id,
      },
      roomId: roomParam.id,
    });
    axios.post(`${process.env.REACT_APP_SERVER_URL}/chat/savechat`, {
      newText: {
        msg: messageRef.current.value,
        username: loggedInUser.username,
        user_id: loggedInUser.user_id,
      },
      room_id: roomParam.id,
    });
    setText('');
    messageRef.current.value = '';
  };

  return (
    <>
      {messageList ? (
        <>
          {/* Header showing user */}
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mx: 'auto',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 100,
            }}
          >
            <Avatar
              alt={`Avatar n°${1}`}
              src={image}
              sx={{ m: 1, width: 56, height: 56 }}
            />
            <Typography variant='body1'>{matchedUserName}</Typography>
          </Paper>

          {/* Chatting area */}
          <ChatroomLayout>
            <Room
              messageList={messageList}
              loggedInUser={loggedInUser}
              image={image}
            />

            {/* Send form */}
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mx: 'auto',
                position: 'fixed',
                bottom: 50,
                left: 0,
                right: 0,
                background: 'white',
                paddingBottom: '1rem',
              }}
            >
              <Grid
                container
                direction='row'
                justifyContent='space-around'
                alignItems='center'
              >
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    type='text'
                    size='small'
                    multiline
                    maxRows={5}
                    inputRef={messageRef}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    // onKeyDown={handleEnter}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant='contained'
                    color='secondary'
                    disabled={text ? false : true}
                    onClick={handleSend}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </ChatroomLayout>
        </>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </>
  );
};

export default Chatroom;
