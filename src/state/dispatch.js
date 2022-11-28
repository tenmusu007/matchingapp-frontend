import axios from 'axios';
import { baseUrl } from '../helper/baseUrl';
export const loginCall = async (user, dispatch) => {
  dispatch({ type: 'LOGIN_START' });

  try {
    const res = await axios.post(`${baseUrl}/login`, user);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', payload: err });
  }
};

export const logoutCall = async (dispatch) => {
  dispatch({ type: 'LOGIN_START' });
};

export const updateCall = async (updateUser, dispatch) => {
  try {
    const res = await axios.put(
				`${baseUrl}/users/${updateUser.userId}`,
			updateUser
		);
    await dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', payload: err });
  }
};
