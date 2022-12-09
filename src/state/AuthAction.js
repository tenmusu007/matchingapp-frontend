export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LoginSuccessAction = (action) => ({
  type: 'LOGIN_SUCCESS',
  payload: {
    isLogin: action.payload,
    isFetching: false,
    error: false,
  },
});

export const LOGIN_CHECK = 'LOGIN_CHECK';
export const LoginCheckAction = (action) => ({
  type: 'LOGIN_CHECK',
  payload: {
    isLogin: action.payload,
    isFetching: false,
    error: false,
  },
});

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LogoutSuccessAction = (action) => ({
  type: 'LOGOUT_SUCCESS',
  payload: {
    isLogin: action.payload,
    isFetching: false,
    error: false,
  },
});

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LoginErrorAction = (action) => ({
  type: 'LOGIN_ERROR',
  payload: {
    isLogin: false,
    isFetching: false,
    error: action.payload,
  },
});
