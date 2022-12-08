const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        isLogin: false,
        isFetching: true,
        error: false,
      };

    case 'LOGIN_SUCCESS':
      return {
        isLogin: action.payload,
        isFetching: false,
        error: false,
      };

    case 'LOGOUT_SUCCESS':
      return {
        isLogin: false,
        isFetching: false,
        error: false,
      };

    case 'LOGIN_ERROR':
      return {
        isLogin: false,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
