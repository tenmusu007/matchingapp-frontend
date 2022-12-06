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

  const deleteChat = (e) => {
    console.log('hey', e);
    const chatInfo = {
      chatId: chat[e].createdChat._id,
    };
    console.log('hey', chatInfo);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/chat/deletechat`, chatInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <MainLayout>
      {chat ? <ChatList chat={chat} deleteChat={deleteChat} /> : <Spinner />}
    </MainLayout>
  );
};

export default Chat;
