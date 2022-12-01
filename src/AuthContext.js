import React, { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './state/AuthReducer';
import { checkIsLogin } from './state/dispatch';

const initialState = {
  isLogin: false,
  isFetching: true,
  // isFetching: false,
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
