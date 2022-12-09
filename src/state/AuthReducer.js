import * as AuthAction from './AuthAction';
import { initialAuthState } from './InitialState';

const AuthReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case AuthAction.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case AuthAction.LOGIN_CHECK:
      return {
        ...state,
        ...action.payload,
      };

    case AuthAction.LOGOUT_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case AuthAction.LOGIN_ERROR:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
