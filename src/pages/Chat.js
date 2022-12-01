import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../Layout/MainLayout';
import ChatList from '../components/ChatList';
import Spinner from '../components/Spinner';

const Chat = () => {
  const [chat, setChat] = useState();

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/chat/getchatlist`,
        {
          withCredentials: true,
        }
      );
      setChat(res.data);
    };
    fetchMatchedUsers();
  }, []);

  return (
    <MainLayout>{chat ? <ChatList chat={chat} /> : <Spinner />}</MainLayout>
  );
};

export default Chat;
