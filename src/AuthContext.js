import axios from 'axios';
import React, { useState, createContext, useEffect, useReducer } from 'react';
import AuthReducer from './state/AuthReducer';

const initialState = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const [isLogin, setIsLogin] = useState("6373f48b2de13e26d98a89c7");

  useEffect(() => {
    const fetchLoggedinUser = async () => {
      await axios
				.get(`${process.env.REACT_APP_SERVER_URL}/cookie`, {
					withCredentials: true,
				})
        .then((res) => {
          console.log("cookie", res.data);
          
					// return setIsLogin(res.data);
					return setIsLogin(true);
				});
    };
    fetchLoggedinUser();
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        isLogin,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
