import React, { useState, useEffect } from 'react';
// import ItmeCard from '../components/ItmeCard';
import MainLayout from '../Layout/MainLayout';
// import { pickRandomUser } from '../helper/Helper';
import axios from 'axios';
// import NomoreUser from './NomoreUser';
// const randomUser = pickRandomUser(users);
import TinderCardCom from '../components/TinderCardCom';

const Home = () => {
  const [usersData, setUsersData] = useState(null);

  const getUserImage = async (users) => {
    const picsURL = `${process.env.REACT_APP_SERVER_URL}/image/userimage`;
    for (let i = 0; i < users.length; i++) {
      const result = await axios.post(
        picsURL,
        { user_id: users[i]._id },
        { withCredentials: true }
      );
      users[i].imageURL = result.data;
    }
    return users;
  };

  useEffect(() => {
    const fetchMatchableUsers = async () => {
      const baseURL = `${process.env.REACT_APP_SERVER_URL}/like/user`;
      const res = await axios.get(baseURL, { withCredentials: true });
      const allMatchableUsers = res.data;
      const usersWithImage = await getUserImage(allMatchableUsers);
      setUsersData(usersWithImage);
    };
    fetchMatchableUsers();
  }, []);

  return (
    <>
      <MainLayout>
        {usersData && <TinderCardCom usersData={usersData} />}
      </MainLayout>
    </>
  );
};

export default Home;
