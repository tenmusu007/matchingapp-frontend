import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../Layout/MainLayout';
import ChatList from '../components/ChatList';
import Spinner from '../components/Spinner';

const Chat = () => {
  const [chat, setChat] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/chat/getchatlist`,
        {
          withCredentials: true,
        }
      );
      setChat(res.data);
      if (reload) setReload(false);
    };
    fetchMatchedUsers();
  }, [reload]);

  const deleteChat = (e) => {
    const chatInfo = {
      chatId: chat[e].createdChat._id,
    };
    const res = axios.post(
      `${process.env.REACT_APP_SERVER_URL}/chat/deletechat`,
      chatInfo,
      {
        withCredentials: true,
      }
    );
    setReload(true);
    return res;
  };

  return (
    <MainLayout>
      {chat ? <ChatList chat={chat} deleteChat={deleteChat} /> : <Spinner />}
    </MainLayout>
  );
};

export default Chat;
