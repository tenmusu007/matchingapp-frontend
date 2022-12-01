import React, { useState, useEffect } from 'react';
import MainLayout from '../Layout/MainLayout';
// import { pickRandomUser } from '../helper/Helper';
import axios from 'axios';
import TinderCardCom from '../components/TinderCardCom';
import Spinner from '../components/Spinner';

const Home = () => {
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    const fetchMatchableUsers = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/like/user`,
        { withCredentials: true }
      );
      setUsersData(res.data);
    };
    fetchMatchableUsers();
  }, []);

  return (
    <>
      <MainLayout>
        {usersData ? <TinderCardCom usersData={usersData} /> : <Spinner />}
      </MainLayout>
    </>
  );
};

export default Home;
