import axios from 'axios';

export const loginCall = async (user, dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/login`,
      user,
      { withCredentials: true }
    );
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        isLogin: res.data,
        isFetching: false,
        error: false,
        message: '',
      },
    });
  } catch (err) {
    dispatch({
      type: 'LOGIN_ERROR',
      payload: {
        isLogin: false,
        isFetching: false,
        error: true,
        message: err.response.data,
      },
    });
  }
};

export const checkIsLogin = async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/cookie`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: 'LOGIN_CHECK',
      payload: {
        isLogin: res.data,
        isFetching: false,
        error: false,
        message: '',
      },
    });
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', payload: err });
  }
};

export const logoutCall = async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/logout`,
      { withCredentials: true }
    );
    dispatch({
      type: 'LOGOUT_SUCCESS',
      payload: {
        isLogin: res.data,
        isFetching: false,
        error: false,
        message: '',
      },
    });
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', payload: err });
  }
};
