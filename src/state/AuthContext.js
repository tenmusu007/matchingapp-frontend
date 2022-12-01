import React, { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import { checkIsLogin } from './dispatch';

const initialState = {
  isLogin: false,
  isFetching: true,
  error: false,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    checkIsLogin(dispatch);
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isLogin: state.isLogin,
          isFetching: state.isFetching,
          error: state.error,
          dispatch,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
