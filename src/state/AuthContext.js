import React, { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import { checkIsLogin } from './dispatch';
import { initialAuthState } from './InitialState';

export const AuthContext = createContext(initialAuthState);

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

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
