import React, { useState, useEffect } from 'react';
import ItmeCard from '../components/ItmeCard';
import MainLayout from '../Layout/MainLayout';
// import { pickRandomUser } from '../helper/Helper';
// import { AuthContext } from '../AuthContext';
import axios from 'axios';
import NomoreUser from './NomoreUser';
// const randomUser = pickRandomUser(users);
import { baseUrl } from '../helper/baseUrl';
const Home = () => {
  const [usersData, setUsersData] = useState([]);
  const [usersIndex, setusersIndex] = useState(0);
  useEffect(() => {
    const fetchMatchableUsers = async () => {
      // const baseURL = `/user`;
      await axios.get(`${baseUrl}/user`, { withCredentials: true }).then((res) => {
				setUsersData(res.data);
			});
    };
    fetchMatchableUsers();
  }, []);

  return (
    <>
      <MainLayout>
        {usersIndex < usersData.length ? (
          <ItmeCard
            usersLength={usersData.length}
            userData={usersData[usersIndex]}
            usersIndex={usersIndex}
            setusersIndex={setusersIndex}
          />
        ) : (
          <NomoreUser />
        )}
      </MainLayout>
    </>
  );
};

export default Home;
